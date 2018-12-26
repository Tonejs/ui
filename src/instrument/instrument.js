import { LitElement, html } from '@polymer/lit-element'
import '../source/omni-oscillator'
import '../component/envelope'
import '../component/frequency-envelope'
import '../rack/rack'
import '../viz/meter'
// import '../viz/meter'
import './presets'
import { ToneBinded } from '../rack/binded'

export class ToneInstrument extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
			presets : { type : String },
			collapsed : { type : Boolean },
			effect : { type : Boolean },
			polyphonic : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.label = ''
		this.effect = false
		this.polyphonic = false
	}

	bind(tone){
		this.shadowRoot.querySelector('tone-meter').bind(tone)
		const presets = this.shadowRoot.querySelector('tone-presets')
		if (presets){
			presets.bind(tone)
		}
		if (this.polyphonic){
			tone.voices.forEach(t => super.bind(t))
		} else {
			super.bind(tone)
		}
	}

	renderAttributes(){
		return html``
	}
	
	render(){
		const dryWetSlider = html`
			<div id="drywet" slot="top">
				<label>Dry/Wet</label>
				<tone-slider 
					label="Dry/Wet"
					attribute="wet"
					min="0"
					max="1"
					bare
					value="1"></tone-slider>
			</div>
		`
		return html`
			<style>
				:host {
					display: block;
				}

				tone-meter {
					position: absolute;
					top: 8px;
					right: 8px;
					width: 24px;
					height: 24px;
					background-color: white;
				}

				tone-presets {
					margin-top: 15px;
				}

				tone-slider, tone-oscillator-type {
					width: 90%;
					min-width: 300px;
					display: block;
					margin: 10px auto;
				}

				#attributeContainer * {
					display: block;
					margin-top: 10px;
				}

				#drywet {
					position: absolute;
					right: 60px;
					top: 0px;
					width: 50%;
					max-width: 150px;
					min-width: 100px;
				}

				#drywet tone-slider {
					display: inline-block;
					margin: 0;
					width: calc(100% - 64px);
					min-width: unset;
				}

				label {
					position: relative;
					top: -5px;
					width: 60px;
					display: inline-block;
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
				}

			</style>
			<tone-rack square ?collapsed=${this.collapsed} label=${this.label}>
				<tone-meter slot="top"></tone-meter>
				${this.effect ? dryWetSlider : html``}
				<div id="attributeContainer">
					${this.renderAttributes()}
				</div>
				<tone-presets presets=${this.presets}></tone-presets>
			</tone-rack square>
		`
	}

}

customElements.define('tone-instrument', ToneInstrument)
