import { html } from '@polymer/lit-element'
import '../source/oscillator'
import '../component/envelope'
import { ToneInstrument } from './instrument'
import { presets } from './synth-presets'

class ToneSynth extends ToneInstrument {

	constructor(){
		super()
		this.label = 'Synth'
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
			<tone-envelope 
				component="envelope"
				collapsed label="Envelope"></tone-envelope>
			<tone-oscillator 
				omni
				component="oscillator"
				collapsed label="Oscillator"></tone-oscillator>
		`
	}

}

customElements.define('tone-synth', ToneSynth)
