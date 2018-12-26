import { LitElement, html } from '@polymer/lit-element'
import { ToneEffect } from './effect'

class ToneChebychev extends ToneEffect {

	constructor(){
		super()
		this.label = 'Chebychev'
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Order"
				attribute="order"
				min="1"
				integer
				max="100"
				value="1"></tone-slider>
		`
	}
	
}

customElements.define('tone-chebychev', ToneChebychev)
