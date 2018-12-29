import { html } from '@polymer/lit-element'
import { Oscillator } from './oscillator'

export class FatOscillator extends Oscillator {

	constructor(){
		super()
		this.tone = null
		this.label = 'FatOscillator'
	}

	renderAttributes(){
		return html`
			${super.renderAttributes()}
			<tone-slider 
				attribute="spread"
				min="2" 
				max="100" 
				value="20" 
				units="cents"
				label="Spread">
			</tone-slider>
			<tone-slider 
				default="0"
				attribute="count"
				integer
				value="2"
				min="1" 
				max="10" 
				label="Count">
			</tone-slider>
			
		`
	}
}

customElements.define('tone-fat-oscillator', FatOscillator)
