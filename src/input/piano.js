import { LitElement, html } from '@polymer/lit-element'
import './keyboard'
import './select'
import '../midi/midi-in'

export class TonePiano extends LitElement {

	static get properties(){
		return {
			polyphonic : { type : Boolean },
		}
	}

	constructor(){
		super()
	}

	bind(instrument){
		this.addEventListener('noteon', e => {
			instrument.triggerAttack(e.detail.name)
		})
		this.addEventListener('noteoff', e => {
			if (this.polyphonic){
				instrument.triggerRelease(e.detail.name)
			} else {
				instrument.triggerRelease()
			}
		})
	}

	firstUpdated(){
		super.firstUpdated()
		const keyboard = this.shadowRoot.querySelector('tone-keyboard')
		this.shadowRoot.querySelector('tone-midi-in').addEventListener('noteon', e => {
			e.stopPropagation()
			keyboard.noteon(e.detail.midi)
		})
		this.shadowRoot.querySelector('tone-midi-in').addEventListener('noteoff', e => {
			e.stopPropagation()
			keyboard.noteoff(e.detail.midi)
		})

		window.addEventListener('resize', this._resize.bind(this))
		setTimeout(() => this._resize(), 100)
	}

	_resize(){
		const width = this.shadowRoot.querySelector('#container').clientWidth
		const octaves = Math.clamp(Math.floor(width / 100) - 1, 1, 8)
		const rootNote = Math.ceil(Math.scale(octaves, 1, 8, 5, 1))
		this.shadowRoot.querySelector('tone-keyboard').setAttribute('rootoctave', rootNote)
		this.shadowRoot.querySelector('tone-keyboard').setAttribute('octaves', octaves)
	}

	render(){
		return html`
			<style>
				:host {
					display: block;
				}

				#container {
					background-color: var(--color-light-gray);
					position: relative;
					padding: 5px;
					display: block;
				}

				tone-keyboard {
					display: block;
					clear: both;
				}

				tone-midi-in {
				    position: relative;
				    top: 5px;
				    right: 5px;
				    display: inline-block;
				    float: right;
				}

			</style>
			<div id="container">
				<tone-midi-in>
				</tone-midi-in>
				<tone-keyboard ?polyphonic=${this.polyphonic}></tone-keyboard>
			</div>
		`
	}

}

customElements.define('tone-piano', TonePiano)
