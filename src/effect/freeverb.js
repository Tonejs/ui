import { LitElement, html } from '@polymer/lit-element'
import { ToneEffect } from './effect'

class ToneFreeverb extends ToneEffect {

	constructor(){
		super()
		this.label = 'Freeverb'
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Room Size"
				attribute="roomSize"
				min="0.1"
				max="0.95"
				value="1"></tone-slider>
			<tone-slider 
				label="Dampening"
				attribute="dampening"
				min="100"
				max="5000"
				exp="2"
				units="hz"
				value="2000"></tone-slider>
		`
	}
	
}

customElements.define('tone-freeverb', ToneFreeverb)
