import { LitElement, html } from '@polymer/lit-element'
import { ToneEnvelope } from './envelope'

class ToneFrequencyEnvelope extends ToneEnvelope {

	renderAttributes(){
		return html`
			<tone-slider 
				attribute="baseFrequency"
				min="20" 
				max="20000" 
				value="400"
				units="hz"
				exp="2"
				label="Frequency">
			</tone-slider>
			<tone-slider 
				attribute="octaves"
				min="-8" 
				max="8" 
				value="2" 
				label="Octaves">
			</tone-slider>
		`
	}
}

customElements.define('tone-frequency-envelope', ToneFrequencyEnvelope)
