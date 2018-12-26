import { html } from '@polymer/lit-element'
import { Oscillator } from './oscillator'

export class PulseOscillator extends Oscillator {

	constructor(){
		super()
		this.tone = null
		this.label = 'PulseOscillator'
	}

	renderAttributes(){
		return html`

			<tone-slider 
				default="0"
				attribute="width"
				min="0" 
				max="1" 
				value="0" 
				label="Width">
			</tone-slider>			
		`
	}
}

customElements.define('tone-pulse-oscillator', PulseOscillator)
