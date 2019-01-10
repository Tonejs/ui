import { LitElement, html } from '@polymer/lit-element'
import '../component/envelope'
import '../component/frequency-envelope'
import '../rack/rack'
import { ToneInstrument } from './instrument'
import { presets } from './membrane-synth-presets'

class ToneMembraneSynth extends ToneInstrument {

	constructor(){
		super()
		this.label = 'MembraneSynth'
		this.presets = JSON.stringify(presets)
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Pitch Decay"
				attribute="pitchDecay"
				min="0.001"
				max="0.2"
				exp="2"
				value="0.01"></tone-slider>
			<tone-slider 
				label="Octaves"
				attribute="octaves"
				min="0.5"
				max="6"
				value="1.5"></tone-slider>
			<tone-oscillator 
				omni
				component="oscillator" 
				collapsed 
				label="Oscillator"></tone-oscillator>
			<tone-envelope 
				component="envelope" 
				collapsed 
				label="Envelope"></tone-envelope>
		`
	}
	
}

customElements.define('tone-membrane-synth', ToneMembraneSynth)
