import { LitElement, html } from '@polymer/lit-element'
import { ToneInstrument } from './instrument'

class ToneSampler extends ToneInstrument {

	constructor(){
		super()
		this.label = 'Sampler'
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Attack"
				attribute="attack"
				min="0"
				max="0.3"
				value="0"></tone-slider>
			<tone-slider 
				label="Release"
				attribute="release"
				min="0"
				max="1.5"
				value="0.1"></tone-slider>
			<tone-select-attribute 
				attribute="curve"
				label="Curve">
				<option value="linear">linear</option>
				<option value="exponential">exponential</option>
				</tone-select-attribute>
		`
	}

}

customElements.define('tone-sampler', ToneSampler)
