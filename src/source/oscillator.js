import { html } from '@polymer/lit-element'
import { ToneBinded } from '../rack/binded'
import './oscillator-viz'
import './oscillator-type'

export class Oscillator extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
			sourceType : { type : String },
			omni : { type : Boolean },
			frequency : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.label = 'Oscillator'
		this.sourceType = 'oscillator'
	}

	setAttribute(attr, source, tone){
		if (attr === 'type'){
			if (this.sourceType === 'oscillator'){
				tone.type = source.value
			} else if (this.sourceType === 'am' || this.sourceType === 'fat' || this.sourceType === 'fm'){
				tone.type = `${this.sourceType}${source.value}`
			} else {
				tone.type = source.value
			}
		} else {
			source.set(tone)
		}
	}

	updated(changed){
		if (changed.has('sourceType')){
			this.dispatchEvent(new CustomEvent('sourceType', { detail : this.sourceType, composed : true, bubbles : true }))
		}
	}

	renderAttributes(){
		return html`
			<style>
				#sourceType {
					position: absolute;
					top: 8px;
					right: 80px;
					background-color: white;
				}

				#attributeContainer {
					margin-top: 20px;
				}

				tone-oscillator-type:not([display]), tone-slider:not([display]), tone-multislider:not([display]){
					display: none;
				}

			</style>
			${this.omni ? html`<tone-select 
				@change=${e => this.sourceType = e.detail}
				slot="top" 
				attribute="sourceType"
				id="sourceType">
				<option value="oscillator">basic</option>
				<option value="fm">fm</option>
				<option value="am">am</option>
				<option value="fat">fat</option>
				<option value="pulse">pulse</option>
				<option value="pwm">pwm</option>
			</tone-select>` : html``}
			<div id="attributeContainer">

				<tone-oscillator-type 
					?display=${this.sourceType !== 'pulse' && this.sourceType !== 'pwm'}
					label="${this.sourceType === 'fm' || this.sourceType === 'am' ? 'Carrier Type' : 'Type'}"
					attribute="baseType">
				</tone-oscillator-type>
				<tone-multislider 
					?display=${this.sourceType !== 'pulse' && this.sourceType !== 'pwm'}
					length="32"
					label="Partials"
					attribute="partials">
				</tone-multislider>
				<tone-slider 
					?display=${this.sourceType !== 'pulse' && this.sourceType !== 'pwm'}
					attribute="partialCount"
					min="0" 
					max="32" 
					value="0" 
					integer
					label="Partial Count">
				</tone-slider>

				<tone-oscillator-type 
					?display=${this.sourceType === 'fm' || this.sourceType === 'am'}
					nocustom
					label="Modulator Type"
					attribute="modulationType">
				</tone-oscillator-type>
				<tone-slider 
					?display=${this.sourceType === 'fm'}
					attribute="modulationIndex"
					min="0.1" 
					max="20" 
					exp="1.5" 
					value="2"
					label="Modulation Index">
				</tone-slider>
				<tone-slider 
					?display=${this.sourceType === 'fm' || this.sourceType === 'am'}
					attribute="harmonicity"
					min="0.25" 
					max="5" 
					value="2"
					label="Harmonicity">
				</tone-slider>

				<tone-slider 
					?display=${this.sourceType === 'fat'}
					attribute="spread"
					min="2" 
					max="100" 
					value="20" 
					units="cents"
					label="Spread">
				</tone-slider>
				<tone-slider 
					?display=${this.sourceType === 'fat'}
					default="0"
					attribute="count"
					integer
					value="2"
					min="1" 
					max="10" 
					label="Count">
				</tone-slider>

				<tone-slider 
					?display=${this.sourceType === 'pulse'}
					default="0"
					attribute="width"
					min="0" 
					max="1" 
					value="0" 
					label="Width">
				</tone-slider>	
				
				<tone-slider 
					?display=${this.sourceType === 'pwm'}
					default="0"
					attribute="modulationFrequency"
					min="0.1" 
					max="10" 
					value="0.5" 
					units="hz"
					label="Modulation Frequency">
				</tone-slider>		
			</div>
		`
	}

	render(){
		return html`
			<style>
				tone-slider {
					display: block;
					margin-top: 5px;
				}

				tone-oscillator-type {
					margin-top: 10px;
					display: block;
				}

				tone-multislider {
					margin-top: 10px;
				}

				tone-viz-oscillator {
					position: absolute;
					top: 9px;
					right: 20px;
				}
			</style>
			<tone-rack label="${this.label}" ?collapsed=${this.collapsed}>
				<tone-viz-oscillator slot="top" class="viz"></tone-viz-oscillator>
				${this.frequency ? html`
					<tone-slider 
						attribute="frequency"
						min="20" 
						max="10000" 
						value="440" 
						exp="2"
						units="hz"
						label="frequency">
					</tone-slider>` : html``}
				${this.renderAttributes()}
			</tone-rack>
		`	
	}
}

customElements.define('tone-oscillator', Oscillator)
