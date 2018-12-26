import { html } from '@polymer/lit-element'
import { Oscillator } from './oscillator'

export class ModOscillator extends Oscillator {

	static get properties(){
		return {
			modIndex : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.tone = null
		this.label = 'ModOscillator'
		this.modIndex = false
	}

	renderAttributes(){
		return html`
			<tone-oscillator-type 
				nocustom
				label="Carrier Type"
				attribute="type">
			</tone-oscillator-type>
			<tone-oscillator-type 
				nocustom
				label="Modulator Type"
				attribute="modulationType">
			</tone-oscillator-type>

			${this.modIndex ? html`<tone-slider 
				attribute="modulationIndex"
				min="0.1" 
				max="20" 
				exp="1.5" 
				value="2"
				label="Modulation Index">
			</tone-slider>` : html``}

			<tone-slider 
				attribute="harmonicity"
				min="0.25" 
				max="5" 
				value="2"
				label="Harmonicity">
			</tone-slider>
			
		`
	}
}

customElements.define('tone-mod-oscillator', ModOscillator)
