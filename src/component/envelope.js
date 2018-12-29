import { LitElement, html } from '@polymer/lit-element'
import '../rack/rack'
import './envelope-viz'
import './envelope-curve'
import { ToneBinded } from '../rack/binded'

export class ToneEnvelope extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
		}
	}

	constructor(){
		super()
		this.label = 'Envelope'
		this.collapsed = false
	}

	renderAttributes(){
		return html``
	}
	
	render(){
		return html`
			<style>
				#top.viz {
					position: absolute;
					top: 9px;
					right: 20px;
					width: 50px;
				}
				tone-rack:not([collapsed]) #top.viz{
					display: none;
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
				tone-slider {
					display: block;
					margin-top: 10px;
				}
				tone-envelope-curve {
					display: block;
					margin-top: 5px;
				}
			</style>
			<tone-rack 
				@collapse=${e => this.collapsed = e.detail}
				?collapsed=${this.collapsed} label="${this.label}">
				<tone-envelope-viz class="viz" id="top" slot="top"></tone-envelope-viz>
				<tone-envelope-viz class="viz" id="bottom" color="#eee"></tone-envelope-viz>
				<tone-slider 
					attribute="attack"
					min="0.01" 
					max="2" 
					exp="2"
					value="0.01" 
					label="Attack">
				</tone-slider>
				<tone-envelope-curve
					label="Attack Curve"
					attribute="attackCurve"
					></tone-envelope-curve>
				<tone-slider 
					attribute="decay"
					min="0.01" 
					max="2" 
					exp="2"
					value="0.01" 
					label="Decay">
				</tone-slider>
				<tone-envelope-curve
					basic
					label="Decay Curve"
					attribute="decayCurve"
					></tone-envelope-curve>
				<tone-slider 
					attribute="sustain"
					min="0" 
					max="1" 
					value="0.01" 
					label="Sustain">
				</tone-slider>
				<tone-slider 
					attribute="release"
					min="0.01" 
					max="4" 
					exp="2"
					value="0.01" 
					label="Release">
				</tone-slider>
				<tone-envelope-curve
					label="Release Curve"
					attribute="releaseCurve"
					></tone-envelope-curve>
				${this.renderAttributes()}
			</tone-rack>
		`
	}

}

customElements.define('tone-envelope', ToneEnvelope)
