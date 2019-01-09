import { LitElement, html } from '@polymer/lit-element'
import AudioKeys from 'audiokeys'
import { resume } from '../util/resume'

///////////////////////////////////////////////////////////////////////////////
// NOTE
///////////////////////////////////////////////////////////////////////////////

class ToneKeyboardNote extends LitElement {

	static get properties(){
		return {
			note : { type : Number },
			color : { type : String },
			activecolor : { type : String },
			active : { type : Boolean },
			velocity : { type : Number },
			touchid : { type : Number },
		}
	}

	fromMidi(midi){
		return Tone.Midi(midi).toNote()
	}

	constructor(){
		super()
		this.color = '#eee'
		this.activecolor = 'white'
		this.active = false
		this.touchid = -1
	}

	updated(changed){
		if (changed.has('active')){
			const eventName = this.active ? 'noteon' : 'noteoff'
			if (!this.active){
				this.touchid = -1
			}
			this.dispatchEvent(new CustomEvent(eventName, {
				detail : {
					name : this.fromMidi(this.note),
					midi : this.note,
					velocity : this.active ? 1 : 0
				},
				composed : true,
				bubbles : true
			}))
		}
	}

	mouseover(e){
		if (e.buttons){
			this.active = true
			this.shadowRoot.querySelector('button').focus()
		}
	}

	keydown(e){
		resume(e)
		if (!e.repeat && (e.key === ' ' || e.key === 'Enter')){
			this.active = true
		}
	}

	keyup(e){
		if (e.key === ' ' || e.key === 'Enter'){
			this.active = false
		}
	}

	touchstart(e){
		e.preventDefault()
		this.touchid = e.touches[0].identifier
		this.active = true
	}

	render(){
		const show = this.note !== 0
		return html`
			<style>
				
				:host {
					display: block;
				}

				#container {
					width: 100%;
					height: 100%;
					display: block;
				}

				#container:not([show]){
					opacity: 0;
					margin: 2px;
					pointer-events: none;
				}

				button {
					border: none;
					-webkit-appearance: none;
					--key-margin: 2px;
					width: 100%;
					height: 100%;
					border: 2px solid white;
					box-sizing: border-box;
					padding: 0;
					outline: none;
					transition: background-color 0.2s;
					color: transparent;
					font-size: 0px;
					border-radius: 2px;
				}
				button[active] {
					background-color: #666!important;
					transition-duration: 0s;
				}
				button:focus {
					border-color: #666;
				}
			</style>
			<div id="container" ?show=${show}>
				${show ? html`
					<button 
						?active=${this.active}
						@mouseover=${this.mouseover.bind(this)}
						@mouseleave=${() => this.active = false}
						@mousedown=${() => this.active = true}
						@touchstart=${this.touchstart.bind(this)}
						@touchend=${() => this.active = false}
						@mouseup=${() => this.active = false}
						@keydown=${this.keydown.bind(this)}
						@keyup=${this.keyup.bind(this)}
						style="background-color: ${this.active ? this.activecolor : this.color};">
							${this.fromMidi(this.note).replace('#', '♯')}
						</button>` : html``}
			</div>
		`
	}

}

customElements.define('tone-keyboard-note', ToneKeyboardNote)

///////////////////////////////////////////////////////////////////////////////
// OCTAVE
///////////////////////////////////////////////////////////////////////////////

class ToneKeyboardOctave extends LitElement {

	static get properties(){
		return {
			octave : { type : Number },
		}
	}

	constructor(){
		super()
		this.octave = 1
	}

	noteon(number){
		const note = this.shadowRoot.querySelector(`tone-keyboard-note[note="${number}"]`)
		note.active = true
	}

	noteoff(number){
		const note = this.shadowRoot.querySelector(`tone-keyboard-note[note="${number}"]`)
		note.active = false	
	}

	_getNoteByTouchId(id){
		const element = Array.from(this.shadowRoot.querySelectorAll('tone-keyboard-note')).find(e => e.touchid === id)
		if (element && element.note){
			return element
		}
	}

	render(){
		const startNote = 12 * this.octave
		const whiteNotes = [0, 2, 4, 5, 7, 9, 11].map(i => i + startNote)
		const blackNotes = [0, 1, 3, 0, 6, 8, 10, 0].map(i => {
			if (i){
				return i + startNote
			} else {
				return 0
			}
		})
		return html`
			<style>

				#container {
					display: block;
					position: relative;
					height: 100%;
					width: 100%;
				}
				tone-keyboard-note {
					order: 0;
					flex-grow: 1;
				}

				#white-notes {
					position: absolute;
					left: 0px;
					top: 0px;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: row;
				}

				#black-notes {
					position: absolute;
					top: 0px;
					width: 100%;
					display: flex;
					flex-direction: row;
					height: 55%;
				}

				#black-notes tone-keyboard-note:first-child, #black-notes tone-keyboard-note:last-child {
					flex-grow: 0.5;
					pointer-events: none;
				}

			</style>
			<div id="container">
				<div id="white-notes">
				${whiteNotes.map(note => html`
					<tone-keyboard-note color="#aaa" note="${note.toString()}"></tone-keyboard-note>
				`)}
				</div>
				<div id="black-notes">
				${blackNotes.map(note => html`
					<tone-keyboard-note color="black" note="${note.toString()}"></tone-keyboard-note>
				`)}
				</div>
			</div>
		`
	}

}

customElements.define('tone-keyboard-octave', ToneKeyboardOctave)

///////////////////////////////////////////////////////////////////////////////
// KEYBOARD
///////////////////////////////////////////////////////////////////////////////

export class ToneKeyboard extends LitElement {

	static get properties(){
		return {
			rootoctave : { type : Number },
			octaves : { type : Number },
			polyphonic : { type : Boolean }
		}
	}

	constructor(){
		super()
		this.rootoctave = 4
		this.octaves = 4
		this.polyphonic = false
		this._computerKeyboard = new AudioKeys({ polyphony : Infinity })
		this._computerKeyboard.down(e => {
			resume()
			this.noteon(e.note)
		})
		this._computerKeyboard.up(e => {
			this.noteoff(e.note)
		})
	}

	_getNoteByTouchId(id){
		const octave = Array.from(this.shadowRoot.querySelectorAll('tone-keyboard-octave')).find(o => o._getNoteByTouchId(id))
		if (octave){
			return octave._getNoteByTouchId(id)
		}
	}

	_touchmove(event){
		Array.from(event.changedTouches).forEach(e => {
			this._getNoteByTouchId(e.identifier)
			const activeNote = this._getNoteByTouchId(e.identifier)
			const element = this.shadowRoot.elementFromPoint(e.clientX, e.clientY)
			if (element && element.shadowRoot){
				const note = element.shadowRoot.elementFromPoint(e.clientX, e.clientY)
				if (note && note.note && activeNote.note !== note.note){
					activeNote.active = false
					activeNote.touchid = -1
					note.active = true
					note.touchid = e.identifier
				}
			}
		})
	}

	_touchend(event){
		Array.from(event.changedTouches).forEach(e => {
			this._getNoteByTouchId(e.identifier)
			const activeNote = this._getNoteByTouchId(e.identifier)
			if (activeNote && activeNote.active){
				activeNote.active = false
				activeNote.touchid = -1
			}
		})
	}

	noteon(midi){
		const octaveNumber = Math.floor(midi / 12)
		const toneOctave = this.shadowRoot.querySelector(`tone-keyboard-octave[octave="${octaveNumber}"]`)
		if (toneOctave){
			toneOctave.noteon(midi)
		}
	}

	noteoff(midi){
		const octaveNumber = Math.floor(midi / 12)
		const toneOctave = this.shadowRoot.querySelector(`tone-keyboard-octave[octave="${octaveNumber}"]`)
		if (toneOctave){
			toneOctave.noteoff(midi)
		}
	}

	render(){
		const octaves = []
		for (let i = this.rootoctave; i < this.rootoctave + this.octaves; i++){
			octaves.push(i)
		}
		return html`
			<style>
				#container {
					display: flex;
					background-color: white;
					height: 80px;
				}

				tone-keyboard-octave {
					flex-grow: 1;
				}
			</style>
			<div id="container"
				@touchmove=${this._touchmove.bind(this)}
				@touchend=${this._touchend.bind(this)}>
				${octaves.map(o => html`
					<tone-keyboard-octave octave=${o.toString()}></tone-keyboard-octave>
				`)}
			</div>
		`
	}

}

customElements.define('tone-keyboard', ToneKeyboard)
