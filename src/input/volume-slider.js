import './slider'

import { LitElement, html } from '@polymer/lit-element'
import sliderStyle from './slider.scss'

class ToneVolumeSlider extends LitElement {

	static get properties(){
		return {
			value : { type : Number },
			attribute : { type : String }
		}
	}

	constructor(){
		super()
		this.value = 0
	}

	sync(tone){
		this.shadowRoot.querySelector('tone-slider').sync(tone)
	}

	render(){
		return html`
			<style>
				:host {
					--computed-slider-height : var(--slider-height, 100px);
					display: inline-block;
				}
				#slider-container {
					height: var(--computed-slider-height);
					width: 40px;
					display: block;
					margin: 0 auto;
					position: relative;					
				}
				tone-slider {
					position: absolute;
					left: 0px;
					top: 0px;
					width: var(--computed-slider-height);
					transform: rotate(-90deg) translate(-100%, 0);
					transform-origin: top left;
				}

				#number {
					margin-top: 10px;
					width: 100%;
					text-align: center;
					font-family: monospace;
					font-size: 12px;
				}

				#container {
					position: relative;
				}

			</style>
			<div id="container">
				<div id="slider-container">
					<tone-slider 
						default="0"
						attribute=${this.attribute}
						max="6"
						min="-80"
						exp="0.4"
						.value="${this.value}"
						@change=${e => this.value = e.detail}
						bare></tone-slider>
				</div>
				<div id="number">${this.value >= 0 ? '+' : ''}${this.value.toFixed(0)} db</div>
			</div>
		`
	}

}

customElements.define('tone-volume-slider', ToneVolumeSlider)
