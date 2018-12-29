import { LitElement, html } from '@polymer/lit-element'
import { ToneBinded } from '../rack/binded'
import '../input/volume-slider'
import '../viz/meter'

export class ToneChannel extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
			solo : { type : Boolean },
			mute : { type : Boolean },
			muted : { type : Boolean },
		}
	}

	bind(tone){
		this.shadowRoot.querySelector('tone-meter').bind(tone)
		this.addEventListener('mute', e => {
			tone.mute = e.detail
		})
		this.addEventListener('solo', e => {
			tone.solo = e.detail
		})
		setInterval(() => {
			this.muted = tone.muted
		}, 100)
		super.bind(tone)
	}

	updated(changed){
		super.updated(changed)
		if (changed.has('solo')){
			this.dispatchEvent(new CustomEvent('solo', { detail : this.solo, composed : true, bubbles : true }))
		}
		if (changed.has('mute')){
			this.dispatchEvent(new CustomEvent('mute', { detail : this.mute, composed : true, bubbles : true }))
		}
	}

	render(){
		return html`
			<style>
				:host {
					display: inline-block;
				}
				h2 {
					text-align: center;
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
					font-weight: normal;
					margin: 0;
					padding: 0;
					padding-bottom: 5px;
				}
				tone-volume-slider, tone-slider {
					display: block;
				}
				#volume {
					padding: 10px;
					position: relative;
				    background-color: var(--color-light-gray);
				}
				#volume tone-volume-slider {
					z-index: 1;
					position: relative;
				}
				#volume tone-meter {
					pointer-events: none;
					z-index: 0;
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: calc(100% - 25px);
					background-color: var(--color-light-gray)
				}
				#container {
					border: 2px solid black;
					border-radius: 10px;
					padding: 10px;
				}
				tone-meter {
					position: absolute;
				}

				#buttons {
					margin-top: 10px;
					display: flex;
				}

				button {
					flex-grow: 1;
					display: inline-block;
					margin: 0 2px;
					border: 2px solid black;
					outline-color: var(--outline-color);
					-webkit-appearance: none;
					padding: 0px 5px;
					height: 20px;
					border-radius: 12px;
					width: 40%;
				}

				button.enabled {
					color: white;
				}

				button#solo.enabled {
					background-color: #149df1;
				}
				button#mute.enabled {
					background-color: #ff672a;
				}
				button[disabled] {
					opacity: 0.5;
					background-color: #ff672a;
					color: white;
				}
			</style>
			<div id="container">
				<h2>${this.label}</h2>
				<div id="volume">
					<tone-meter stereo></tone-meter>
					<tone-volume-slider
						attribute="volume">
					</tone-volume-slider>
				</div>
				<tone-slider
					bare
					min="-1"
					max="1"
					default="0"
					value="0"
					anchor="center"
					attribute="pan">
				</tone-slider>
				<div id="buttons">
					<button id="solo" aria-checked=${this.solo} 
						@click=${e => this.solo = !this.solo}
						class=${this.solo ? 'enabled' : ''}>
						solo</button>
					<button id="mute" aria-checked=${this.mute}
						?disabled=${this.muted && !this.mute}
						class="${this.mute ? 'enabled' : ''}"
						@click=${e => this.mute = !this.mute}>
					mute</button>
				</div>
			</div>
		`
	}
}

customElements.define('tone-channel', ToneChannel)
