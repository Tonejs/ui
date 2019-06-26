import { LitElement, html } from '@polymer/lit-element'
import '../input/select'
import WebMidi from 'webmidi'

export class TonePianoRollNote extends LitElement {

	static get properties(){
		return {
			value : { type : Number },
			time : { type : Number },
			duration : { type : Number }
		}
	}

	constructor(){
		super()
		this.duration = -1
	}

	updated(changed){
		if (changed.has('duration')){
			/* if (this.duration === -1){
				this._durationUpdate = setInterval(() => this.requestUpdate(), 16)
			} else {
				clearInterval(this._durationUpdate)
			} */
		}
	}

	render(){

		let transformString = ''
		if (this.duration > 0){
			transformString = `transform:translate(${this.time.toString()}px, 0px); width: ${this.duration.toString()}px`
		}

		return html`
			<style>
				#note {
					position: absolute;
					left: 0px;
					top: 0px;
					height: 100%;
					width: 1px;
					background-color: black;
				}

				#note[ongoing] {
					left: unset;
					right: 0px;
					width: 10%;
					height: 100%;
				}
			</style>
			<div id="note" 
				style=${transformString}></div>
		`
	}
}

customElements.define('piano-roll-note', TonePianoRollNote)
