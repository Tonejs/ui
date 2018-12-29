import { html } from '@polymer/lit-element'
import './mono-synth'
import '../input/slider'
import { ToneInstrument } from './instrument'

class ToneDuoSynth extends ToneInstrument {

	constructor(){
		super()
		this.label = 'MembraneSynth'
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Vibrato Rate"
				attribute="vibratoRate"
				min="0.1"
				max="5"
				units="hz"
				value="1"></tone-slider>
			<tone-slider 
				label="Vibrato Amount"
				attribute="vibratoAmount"
				min="0"
				max="1"
				value="1"></tone-slider>
			<tone-slider 
				label="Harmonicity"
				attribute="harmonicity"
				min="0.5"
				max="4"
				value="1"></tone-slider>
			<tone-mono-synth 
				component="voice0" 
				collapsed 
				nopresets
				label="Voice 0"></tone-mono-synth>
			<tone-mono-synth 
				component="voice1" 
				collapsed 
				nopresets
				label="Voice 1"></tone-mono-synth>
		`
	}
	
}

customElements.define('tone-duo-synth', ToneDuoSynth)
