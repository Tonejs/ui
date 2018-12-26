import { LitElement, html } from '@polymer/lit-element'
import '../rack/rack'
import '../input/select'
import './oscillator-viz'
import './oscillator-type'
import { ToneBinded } from '../rack/binded'

export class Oscillator extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
			frequency : { type : Boolean }
		}
	}

	constructor(){
		super()
		this.label = 'Oscillator'
	}

	renderAttributes(){
		return html`
			<tone-oscillator-type 
				label="Type"
				attribute="type">
			</tone-oscillator-type>
			<tone-multislider 
				length="32"
				label="Partials"
				attribute="partials">
			</tone-multislider>
			<tone-slider 
				attribute="partialCount"
				min="0" 
				max="32" 
				value="0" 
				integer
				label="Partial Count">
			</tone-slider>
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
