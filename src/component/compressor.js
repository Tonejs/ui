import { LitElement, html } from '@polymer/lit-element'
import '../rack/rack'
import './envelope-viz'
import './envelope-curve'
import { ToneBinded } from '../rack/binded'

export class ToneCompressor extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
		}
	}

	constructor(){
		super()
		this.label = 'Compressor'
		this.collapsed = false
	}

	renderAttributes(){
		return html``
	}
	
	render(){
		// <tone-compressor-viz class="viz" id="top" slot="top"></tone-compressor-viz>
		// <tone-compressor-viz class="viz" id="bottom"></tone-compressor-viz>
		return html`
			<style>
				#top.viz {
					position: absolute;
					top: 9px;
					right: 20px;
					width: 50px;
				}
				#bottom.viz {
					position: relative;
					display: block;
					width: calc(100% - 20px);
					height: 60px;
					background-color: black;
					border-radius: 10px;
					padding: 10px;
					margin-top: 20px;
				}
				tone-rack:not([collapsed]) #top.viz{
					display: none;
				}
				tone-slider {
					display: block;
					margin-top: 10px;
				}
				
			</style>
			<tone-rack 
				@collapse=${e => this.collapsed = e.detail}
				?collapsed=${this.collapsed} label="${this.label}">
				
				<tone-slider 
					attribute="attack"
					min="0.001" 
					max="1" 
					value="0.1" 
					label="Attack">
				</tone-slider>
				<tone-slider 
					attribute="release"
					min="0.001" 
					max="1" 
					value="0.1" 
					label="Release">
				</tone-slider>
				<tone-slider 
					attribute="threshold"
					min="-60" 
					max="0" 
					value="-12" 
					exp="0.5"
					label="Threshold">
				</tone-slider>
				<tone-slider 
					attribute="ratio"
					min="1" 
					max="20" 
					value="4" 
					label="Ratio">
				</tone-slider>
				<tone-slider 
					attribute="knee"
					min="0" 
					max="40" 
					value="30" 
					label="Knee">
				</tone-slider>
			</tone-rack>
		`
	}

}

customElements.define('tone-compressor', ToneCompressor)
