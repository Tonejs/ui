import { LitElement, html } from '@polymer/lit-element'
import { ToneEffect } from './effect'

class ToneReverb extends ToneEffect {

	static get properties(){
		return {
			generating : { type : Boolean }
		}
	}

	constructor(){
		super()
		this.label = 'Reverb'
		this.generating = false
	}

	bind(tone){
		super.bind(tone)
		this.generate(tone)
		let generationTime = -1
		//regenerate when something changes
		this.addEventListener('change', () => {
			this.generating = true
			clearTimeout(generationTime)
			generationTime = setTimeout(() => {
				this.generate(tone)
			}, 100)
		})
	}

	async generate(tone){
		this.generating = true
		await tone.generate()
		this.generating = false
	}

	renderAttributes(){
		return html`
			${this.generating ? html`
					<div style="position: absolute; top: 2px; left: 110px; color: var(--color-dark-gray);"
						id="#generating">Generating...</div>
				` : html``}
			<tone-slider 
				label="Decay"
				attribute="decay"
				min="0.1"
				max="4"
				value="1"></tone-slider>
			<tone-slider 
				label="Predelay"
				attribute="preDelay"
				min="0.001"
				max="0.1"
				value="0"></tone-slider>
		`
	}
	
}

customElements.define('tone-reverb', ToneReverb)
