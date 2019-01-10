import { LitElement, html } from '@polymer/lit-element'
import '../rack/rack'
import '../input/slider'
import '../viz/oscilloscope'
import { ToneBinded } from '../rack/binded'
import { resume } from '../util/resume'

const speakerOff = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
const speakerMid = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
const speakerOn = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`

class ToneUnmute extends ToneBinded {

	static get properties(){
		return {
			suspended : { type : Boolean },
			muted : { type : Boolean },
			focused : { type : Boolean },
			novolume : { type : Boolean }
		}
	}

	constructor(){
		super()
		this.suspended = true
		this.muted = false
		this.focused = false

		setInterval(() => {
			this.suspended = Tone.context.state === 'suspended'
		}, 100)
	}

	updated(changed){
		if (changed.has('muted')){
			Tone.Master.mute = this.muted
			const volume = this.shadowRoot.querySelector('#volume')
			if (!this.novolume && !this.muted && volume.min == volume.value){
				volume.value = 0
			}
		}
	}

	_clicked(e){
		resume(e)
		if (Tone.context.state !== 'suspended'){
			this.muted = !this.muted
		}
	}

	_adjustVolume(e){
		if (e.detail === e.target.min){
			this.muted = true
		} else {
			this.muted = false
		}
		Tone.Master.volume.value = e.detail
	}
	
	render(){
		return html`
			<style>
				:host {
					display: block;
					position: fixed;
					top: 10px;
					right: 10px;
				}

				#container {
					position: absolute;
					width: 44px;
					height: 44px;
					right: 0px;
					top: 0px;
					border-radius: 24px;
					border: 2px solid black;
					background-color: white;
					overflow: hidden;
					transition: width 0.2s;
					box-shadow: var(--shadow-medium);
				}

				#container:hover:not([novolume]), #container[focused]:not([novolume]) {
					width: 144px;
				}

				#container:hover tone-slider, #container[focused] tone-slider {
					opacity: 1;
					width: 80px;
				}

				tone-slider {
					position: absolute;
					left: 16px;
					top: 2px;
					width: 0px;
					opacity: 0;
					transition: width 0.2s, opacity 0.2s;;
				}

				#speaker {
					position: absolute;
					top: 10px;
					right: 10px;
					background-color: transparent;
					outline-color: var(--outline-color);
					border: none;
					-webkit-appearance: none;
					height: 24px;
					width: 24px;
					padding: 0px;
					cursor: pointer;
				}

				#speaker svg {
					width: 100%;
					height: 100%;
				}

			</style>
			<div id="container" ?focused=${this.focused} ?novolume=${this.novolume}>
				<button 
					@blur=${e => this.focused = false}
					@focus=${e => this.focused = true}
					@click=${this._clicked.bind(this)}
					id="speaker" aria-label="speaker" aria-checked=${this.suspended}>
					${this.suspended || this.muted ? speakerOff : speakerOn}
				</button>

				${!this.novolume ? html`
					<tone-slider 
						@blur=${e => this.focused = false}
						@focus=${e => this.focused = true}
						id="volume"
						@change=${this._adjustVolume.bind(this)}
						bare min="-60" max="0" value="0"></tone-slider>` : html``}
				
			</div>
		`
	}

}

customElements.define('tone-unmute', ToneUnmute)
