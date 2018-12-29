import { LitElement, html } from '@polymer/lit-element'
import '../rack/rack'
import '../input/slider'
import '../viz/oscilloscope'
import { ToneBinded } from '../rack/binded'
import { resume } from '../util/resume'

const micClosed = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg>`
const micOpen = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`

class ToneMic extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
			open : { type : Boolean },
			supported : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.label = 'Noise'
		this.inputs = []
		this.supported = Tone.UserMedia.supported
	}

	async bind(tone){

		if (!this.supported){
			return
		}

		setInterval(() => {
			this.open = tone.state === 'started'
		}, 100)

		const micSelect = this.shadowRoot.querySelector('tone-select')

		this.shadowRoot.querySelector('#mic').addEventListener('click', e => {
			resume(e)
			if (!this.open){
				tone.open(micSelect.value)
			} else {
				tone.close()
			}
		})

		micSelect.addEventListener('change', e => {
			if (this.open){
				tone.open(micSelect.value)
			}
		})

		this.shadowRoot.querySelector('tone-oscilloscope').bind(tone)

		//inputs
		this.inputs = await Tone.UserMedia.enumerateDevices()
		this.requestUpdate()
	}
	
	render(){
		return html`
			<style>
				:host {
					display: block;
				}

				#container {
					width: 100%;
					min-width: 100px;
					height: 44px;
					box-sizing: border-box;
					border-radius: 22px;
					border: 2px solid black;
					position: relative;
				}

				#mic {
					background-color: transparent;
					outline-color: var(--outline-color);
					border: none;
					-webkit-appearance: none;
					height: 100%;
					margin-left: 10px;
					margin-top: 1px;
				}

				tone-oscilloscope {
					position: absolute;
					right: 10px;
					top: 8px;
				}

				tone-select {
					max-width: 200px;
					position: absolute;
					left: 50%;
					transform: translate(-50%, 0);
					top: 8px;
				}

				button[disabled] {
					opacity: 0.5;
				}

				#notSupported {
					display: inline-block;
					color: #aaa;
					top: -6px;
				    position: relative;
					margin-left: 10px;
				}

			</style>
			<div id="container">
				<button 
					?disabled=${!this.supported}
					id="mic" aria-label="microphone" aria-checked=${this.open}>
					${this.open ? micOpen : micClosed}
				</button>
				${this.supported ? html`
					<tone-select>
						${this.inputs.map(i => html`
							<option value=${i.deviceId}>${i.label}</option>
						`)}
					</tone-select>
					<tone-oscilloscope></tone-oscilloscope>
				` : html`
					<div id="notSupported"> UserMedia Not Supported</div>
				`}
			</div>
		`
	}

}

customElements.define('tone-microphone', ToneMic)
