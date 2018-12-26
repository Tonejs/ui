import { html } from '@polymer/lit-element'
import { Oscillator } from './oscillator'

export class PWMOscillator extends Oscillator {

	constructor(){
		super()
		this.tone = null
		this.label = 'PWMOscillator'
	}

	renderAttributes(){
		return html`

			<tone-slider 
				default="0"
				attribute="modulationFrequency"
				min="0.1" 
				max="10" 
				value="0.5" 
				units="hz"
				label="Modulation Frequency">
			</tone-slider>			
		`
	}
}

customElements.define('tone-pwm-oscillator', PWMOscillator)
