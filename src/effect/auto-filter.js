import { LitElement, html } from '@polymer/lit-element'
import { ToneEffect } from './effect'

class ToneAutoFilter extends ToneEffect {

	constructor(){
		super()
		this.label = 'AutoFilter'
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Frequency"
				attribute="frequency"
				min="0.1"
				max="20"
				units="hz"
				value="1"></tone-slider>
			<tone-slider 
				label="Base Frequency"
				attribute="baseFrequency"
				min="20"
				max="4000"
				units="hz"
				value="200"></tone-slider>
			<tone-slider 
				label="Octaves"
				attribute="octaves"
				min="0.5"
				max="5"
				value="2.5"></tone-slider>
			<tone-slider 
				label="Depth"
				attribute="depth"
				min="0"
				max="1"
				value="0.5"></tone-slider>
			<tone-oscillator-type
				attribute="type"
				label="Type"
				nocustom></tone-oscillator-type>
			<tone-filter
				collapsed
				component="filter"
				label="Filter"></tone-filter>
		`
	}
	
}

customElements.define('tone-auto-filter', ToneAutoFilter)
