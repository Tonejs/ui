import { LitElement, html } from '@polymer/lit-element'
import '../source/oscillator'
import '../component/envelope'
import '../input/slider'
import { ToneInstrument } from './instrument'
import { presets } from './fm-synth-presets'

class ToneFMSynth extends ToneInstrument {

	constructor(){
		super()
		this.label = 'FMSynth'
		this.presets = JSON.stringify(presets)
	}
	
	renderAttributes(){
		return html`
			<tone-slider 
				label="Portamento"
				attribute="portamento"
				min="0"
				max="0.3"
				value="0"></tone-slider>
			<tone-slider 
				label="Harmonicity"
				attribute="harmonicity"
				min="0.5"
				max="4"
				value="1"></tone-slider>
			<tone-slider 
				label="Modulation Index"
				attribute="modulationIndex"
				min="0.1"
				max="40"
				value="1"></tone-slider>
			<tone-envelope 
				component="envelope"
				collapsed 
				label="Carrier Envelope"></tone-envelope>
			<tone-oscillator 
				omni
				component="oscillator"
				collapsed label="Carrier Oscillator"></tone-oscillator>
			<tone-envelope 
				component="modulationEnvelope"
				collapsed 
				label="Modulation Envelope"></tone-envelope>
			<tone-oscillator 
				component="modulation"
				collapsed label="Modulation Oscillator"></tone-oscillator>
		`
	}

}

customElements.define('tone-fm-synth', ToneFMSynth)
