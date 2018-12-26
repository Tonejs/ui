import { LitElement, html } from '@polymer/lit-element'
import { ToneEffect } from './effect'
import '../source/oscillator-type'

class ToneChorus extends ToneEffect {

	constructor(){
		super()
		this.label = 'Chorus'
	}

	/*{
		"frequency" : 1.5,
		"delayTime" : 3.5,
		"depth" : 0.7,
		"type" : "sine",
		"spread" : 180
	}*/

	renderAttributes(){
		return html`
			<tone-slider 
				label="Frequency"
				attribute="frequency"
				min="0.1"
				max="4"
				units="hz"
				value="1"></tone-slider>
			<tone-slider 
				label="Delay Time"
				attribute="delayTime"
				min="0.1"
				exp="2"
				max="20"
				units="ms"
				value="1"></tone-slider>
			<tone-slider 
				label="Spread"
				attribute="spread"
				min="0"
				max="360"
				units="deg"
				value="1"></tone-slider>
			<tone-slider 
				label="Depth"
				attribute="depth"
				min="0"
				max="1"
				value="0.5"></tone-slider>
			<tone-oscillator-type
				attribute="type"
				label="Type"
				nocustom
				></tone-oscillator-type>
		`
	}
	
}

customElements.define('tone-chorus', ToneChorus)
