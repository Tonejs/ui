import { LitElement, html } from '@polymer/lit-element'
import { ToneBinded } from '../rack/binded'
import '../input/volume-slider'
import '../viz/meter'

export class TonePanVol extends ToneBinded {

	static get properties(){
		return {
			label : { type : String }
		}
	}

	bind(tone){
		this.shadowRoot.querySelector('tone-meter').bind(tone)
		super.bind(tone)
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
			</div>
		`
	}
}

customElements.define('tone-pan-vol', TonePanVol)
