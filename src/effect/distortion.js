import { html } from '@polymer/lit-element'
import { ToneEffect } from './effect'

class ToneDistortion extends ToneEffect {

	constructor(){
		super()
		this.label = 'Distortion'
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Distortion"
				attribute="distortion"
				min="0"
				max="1"
				value="1"></tone-slider>
		`
	}
	
}

customElements.define('tone-distortion', ToneDistortion)
