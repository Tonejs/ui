import { LitElement, html } from '@polymer/lit-element'
import DragSelect from 'dragselect'
import Midi from '@tonejs/midi'
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js'
import interact from 'interactjs'
import UndoManager from 'undo-manager'

export class ToneMidiTrack extends LitElement {

	static get properties(){
		return {
			track : { type : Number },
			src : { type : String },
			duration : { type : Number },
			min : { type : Number },
			max : { type : Number }
		}
	}

	constructor(){
		super()
		this.track = 0
		this.midi = new Midi()
		this.min = 48
		this.max = 60
		this.duration = 0
		//make sure it's got at least 1 track
		this.midi.addTrack()
	}

	updated(changed){
		if (changed.has('src')){
			this._loadUrl()
		}
	}

	firstUpdated(){
		super.firstUpdated()
		// this._dragSelect = new DragSelect({
		// 	area : this.shadowRoot.querySelector('#container'),
		// 	selectedClass : 'selected',
		// })
		// window.addEventListener('keydown', e => {
		// 	if (e.key === 'Backspace'){
		// 		this._pushState()
		// 		this._dragSelect.getSelection().forEach(element => {
		// 			element.dispatchEvent(new CustomEvent('delete'))
		// 		})
		// 		this._dragSelect.clearSelection()
		// 		this.duration = Math.min(this.duration, this.midi.tracks[this.track].duration)
		// 	}
		// })
		// // add an interact object for nodes that get added or removed
		// this._interactableNotesObserver = new FlattenedNodesObserver(this.shadowRoot.querySelector('#container'), (e) => {
		// 	// const notes = e.addedNodes.filter(e => e.type)
		// 	const addedEvents = e.addedNodes.filter(n => n.className === 'event')
		// 	addedEvents.forEach(e => {
		// 		this._interactives.set(e, interact)
		// 		interact(e).draggable({
		// 			axis : 'x',
		// 			restrict : {
		// 				restriction : 'parent',
		// 			},
		// 			onmove : (event) => {
		// 				this._dragSelect.break()
		// 				const note = this._elementMap.get(e)
		// 				const timeDiff = (event.dx / this.shadowRoot.querySelector('#container').offsetWidth) * this.duration
		// 				note.time = Math.round(Math.max(0, note.time + timeDiff))
		// 				this.requestUpdate()
		// 			}
		// 		}).resizable({
		// 			axis : 'x',
		// 			edges : { left : false, right : true, bottom : false, top : false },
		// 			onmove : (event) => {
		// 				this._dragSelect.break()
		// 				const note = this._elementMap.get(e)
		// 				const timeDiff = (event.dx / this.shadowRoot.querySelector('#container').offsetWidth) * this.duration
		// 				note.duration = Math.round(Math.max(1, note.duration + timeDiff))
		// 				this.requestUpdate()
		// 			},
		// 			onend : () => {

		// 			}
		// 		})
		// 	})
		// 	const removedEvents = e.removedNodes.filter(n => n.className === 'event')
		// 	removedEvents.forEach(e => {
		// 		if (this._interactives.has(e)){
		// 			//remove the event listeners
		// 			this._interactives.get(e).off()
		// 			this._elementMap.delete(e)
		// 			this._interactives.delete(e)
		// 		}
		// 	})
		// })
	}

	async _loadUrl(){
		this.midi = await Midi.fromUrl(this.src)
		this.duration = this.midi.tracks[this.track].duration
		//compute min and max
		const midis = this.midi.tracks[this.track].notes.map(note => note.midi)
		this.min = Math.min(...midis)
		this.max = Math.max(...midis)
	}

	render(){

		const precision = 3
		const noteHeight = `${(100 / (this.max - this.min)).toFixed(precision)}%`
		const track = this.midi.tracks[this.track]
		const events = track.notes.map(note => {
			const left = `${((note.time / this.duration) * 100).toFixed(precision)}%`
			const top = `${Math.scale(note.midi, this.max, this.min-1, 0, 100).toFixed(precision)}%`
			const width = `${((note.duration / this.duration) * 100).toFixed(precision)}%`
			const deleteThisNote = () => {
				const index = track.notes.indexOf(note)
				track.notes.splice(index, 1)
				this.requestUpdate()
			}
			return html`
			<span @delete=${deleteThisNote} title=${note.name} style="left: ${left}; top: ${top}; width: ${width}"
				class="event"></span>
			`
		})

		return html`
			<style>
				:host{
					display: block;
					background-color: var(--color-light-gray);
					padding: 5px;
					overflow: hidden;
					min-height: 200px;
					position: relative;
				}

				#container {
					position: relative;
					overflow: auto;
					width: 100%;
					height: 200px;
					top: 0px;
					left: 0px;
				}

				#container .event {
					position: absolute;
					left: 0px;
					top: 0px;
					background-color: black;
					height: ${noteHeight};
				}

				#container .event.selected {
					border: 2px solid white;
					background-color: var(--color-gray);
					margin-top: -2px;
					margin-left: -2px;
				}
			</style>
			<div id="top">
			</div>
			<div id="container">
				${events}
			</div>
		`
	}
}

customElements.define('tone-midi-track', ToneMidiTrack)
