import { LitElement, html } from '@polymer/lit-element'
import '../component/envelope'
import '../component/frequency-envelope'
import '../rack/rack'
import { ToneInstrument } from './instrument'
import { presets } from './metal-synth-presets'

class ToneMetalSynth extends ToneInstrument {

	constructor(){
		super()
		this.label = 'MetalSynth'
		this.presets = JSON.stringify(presets)
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Harmonicity"
				attribute="harmonicity"
				min="0.5"
				max="20"
				value="1"></tone-slider>
			<tone-slider 
				label="Modulation Index"
				attribute="modulationIndex"
				min="0.5"
				max="40"
				value="1"></tone-slider>
			<tone-slider 
				label="Resonance"
				attribute="resonance"
				min="100"
				max="8000"
				exp="2"
				value="4000"></tone-slider>
			<tone-slider 
				label="Octaves"
				attribute="octaves"
				min="0.5"
				max="4"
				value="1.5"></tone-slider>
			<tone-envelope 
				component="envelope" 
				collapsed 
				label="Envelope"></tone-envelope>
		`
	}
	
}

customElements.define('tone-metal-synth', ToneMetalSynth)
