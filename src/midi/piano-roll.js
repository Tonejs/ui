import { LitElement, html } from '@polymer/lit-element'
import { repeat } from 'lit-html/directives/repeat'
import '../input/select'
import './piano-roll-note'
import uniqid from 'uniqid'
import WebMidi from 'webmidi'
import DragSelect from 'dragselect'
import Midi from '@tonejs/midi'

export class TonePianoRoll extends LitElement {

	static get properties(){
		return {
			octaves : { type : Number },
			scale : { type : Number },
			recording : { type : Boolean },
			src : { type : String }
		}
	}

	constructor(){
		super()
		this._allEvents = []
		this._allRows = new Map()
		this._activeEvents = new Map()
		this._lastEvent = null
		this._startTime = 0
		this.scale = 1
		this.midi = new Midi()
	}
	
	updated(changed){
		if (changed.has('src')){
			this._loadUrl()
		}
	}
	
	async _loadUrl(){
		this.midi = await Midi.fromUrl(this.src)
		this.requestUpdate()
	}
	
	firstUpdated(){
		super.firstUpdated()

		this._dragSelect = new DragSelect({
			area : this.shadowRoot.querySelector('#scrollContainer'),
			callback(elements){
				console.log(elements)
			}
		})

		this.shadowRoot.querySelector('tone-midi-in').addEventListener('noteon', e => {

			if (!this.recording){
				return
			}

			this._lastEvent = e.detail.timestamp

			const event = {
				value : e.detail.midi,
				time : e.detail.timestamp,
				duration : -1,
				id : uniqid()
			}
			
			this.addEvent(event)
			this._activeEvents.set(event.value, event)
		})

		this.shadowRoot.querySelector('tone-midi-in').addEventListener('noteoff', e => {
			this._lastEvent = e.detail.timestamp

			if (this._activeEvents.has(e.detail.midi)){
				const event = this._activeEvents.get(e.detail.midi)
				event.duration = e.detail.timestamp - event.time
				this._activeEvents.delete(event.value)
				this.requestUpdate()
			}
		})
	}

	async addEvent(data){
		if (this._allRows.has(data.value)){
			this._allRows.get(data.value).push(data)
		} else {
			this._allRows.set(data.value, [data])
		}
		this.requestUpdate()
		await this.updateComplete
		this._dragSelect.addSelectables(this.shadowRoot.querySelectorAll('piano-roll-note'))
		console.log(this._dragSelect.selectables.length)
	}

	_recordButton(){
		this.recording = !this.recording
		if (this.recording){
			this._startTime = WebMidi.time
			this._lastEvent = null
		} 
	}

	removeEvent(data){

	}

	render(){
		let scaling = 1
		if (this._lastEvent){
			scaling = (this.clientWidth - 20) / (this._lastEvent - this._startTime)
		}
		scaling *= this.scale

		return html`
			<style>
				:host{
					display: block;
					background-color: var(--color-light-gray);
					padding: 5px;
					overflow: hidden;
				}
				#scrollContainer {
					overflow-x:auto;
					clear: both;
					position: relative;
				}
				#container {
					min-height: 200px;
					display: inline-flex;
					flex-direction: column-reverse;
				}

				#container .row {
					flex: 1;
					margin: 1px;
					position: relative;
				}

				tone-midi-in {
					position: relative;
					float: right;
				}

				#activeNotes {
					position: absolute;
					top: 0px;
					right: 0px;
					height: 100%;
					width: 3px;
					display: inline-flex;
					flex-direction: column-reverse;
				}

				piano-roll-note.ds-selected {
					background-color: green;
				}

				#activeNotes .row{
					margin: 1px 0px;
					position: relative;
					height: 100%;
				}

				#activeNotes .row.active{
					background-color: gray;
				}
				
			</style>
			<div id="top">
				<button @click=${this._recordButton.bind(this)}>${this.recording ? 'stop' : 'start'}</button>
				<tone-midi-in></tone-midi-in>
			</div>
			<div id="scrollContainer">
				<div id="container" style="transform:scale(${scaling.toFixed(5)}, 1);">
					${Array.from(this._allRows.keys()).map(value => html`
						<div class="row" style="order: ${value.toString()}" value=${value.toString()}>
							${repeat(this._allRows.get(value), i => i.id, event => html`
								<piano-roll-note time=${(event.time - this._startTime).toString()} duration=${event.duration.toString()}></piano-roll-note>
							`)}
						</div>
					`)}
				</div>
				<div id="activeNotes">
					${Array.from(this._allRows.keys()).map(value => html`
						<div class="row ${this._activeEvents.has(value) ? 'active' : 'inactive'}" 
							
							style="order: ${value.toString()}" 
							value=${value.toString()}>
							
						</div>
					`)}
				</div>
			</div>
		`
	}
}

customElements.define('tone-piano-roll', TonePianoRoll)
