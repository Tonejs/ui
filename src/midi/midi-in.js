import { LitElement, html } from '@polymer/lit-element'
import '../input/select'
import WebMidi from 'webmidi'

export class ToneMidiIn extends LitElement {

	constructor(){
		super()

		WebMidi.enable(e => {
			if (e){
				error(e)
			}
			WebMidi.addListener('connected', e => {
				if (e.port.type === 'input'){
					this.requestUpdate()
				}
			})
			WebMidi.addListener('disconnected', e => {
				this.requestUpdate()
			})
		})
	}

	_flash(){
		clearTimeout(this._flashTimeout)
		const light = this.shadowRoot.querySelector('#light')
		light.classList.add('flash')
		this._flashTimeout = setTimeout(() => light.classList.remove('flash'), 100)
	}

	_connectMidi(e){
		if (e.target.value === 'none'){
			this.shadowRoot.querySelector('#light').classList.remove('connected')
			return
		} else {
			this.shadowRoot.querySelector('#light').classList.add('connected')
		}
		const input = WebMidi.getInputById(e.target.value)
		input.addListener('noteon', 'all', e => {
			const name = `${e.note.name}${e.note.octave}`
			const midi = e.note.number
			this._flash()
			this.dispatchEvent(new CustomEvent('noteon', {
				detail : {
					name, midi, 
					velocity : e.velocity
				},
				composed : true,
				bubbles : true
			}))
		})
		input.addListener('noteoff', 'all', e => {
			const name = `${e.note.name}${e.note.octave}`
			const midi = e.note.number
			this._flash()
			this.dispatchEvent(new CustomEvent('noteoff', {
				detail : {
					name, midi, 
					velocity : e.velocity
				},
				composed : true,
				bubbles : true
			}))
		})

		input.addListener('controlchange', 'all', e => {
			this._flash()
			/*if (e.controller.name === 'holdpedal'){
					const down = e.value > 0
					this.emit('pedal', { down, originalEvent : e })
				}*/
		})
	}

	render(){
		window.WebMidi = WebMidi
		if (WebMidi.supported){
			return html`
				<style>
					:host {
						display: block;
					}

					#container {
						display: block;
						margin-bottom: 10px;
					}

					label {
						font-family: var(--label-font-family);
						font-size: var(--label-font-size);
						margin-right: 10px;
					}

					tone-select, label {
						display: inline-block;
					}

					#container {
						position: relative;
					}

					#light {
						width: 10px;
						height: 10px;
						background-color: white;
						display: inline-block;
					}

					#light.connected {
						background-color: var(--color-gray);
					}

					#light.connected.flash {
						background-color: black!important;
					}

				</style>
				<div id="container">
					<div id="light"></div>
					<label>MIDI</label>
					<tone-select
						@change=${this._connectMidi.bind(this)}>
						<option value="none">none</option>
						${WebMidi.inputs.map(input => html`
							<option value=${input.id}>${input.name}</option>
						`)}
					</tone-select>
				</div>
			`
		} else {
			return html``
		}
	}
}

customElements.define('tone-midi-in', ToneMidiIn)
