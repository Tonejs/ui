import { LitElement, html } from '@polymer/lit-element'
import '../source/oscillator'
import '../component/envelope'
import '../component/frequency-envelope'
import '../rack/rack'
import { ToneInstrument } from './instrument'
import { presets } from './mono-synth-presets'

class ToneMonoSynth extends ToneInstrument {

	constructor(){
		super()
		this.label = 'MonoSynth'
		this.presets = JSON.stringify(presets)
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Portamento"
				attribute="portamento"
				min="0"
				max="0.1"
				value="0"></tone-slider>
			<tone-envelope 
				component="envelope" 
				collapsed 
				label="Envelope"></tone-envelope>
			<tone-oscillator 
				omni
				component="oscillator" 
				class="rack" collapsed label="Oscillator"></tone-oscillator>
			<tone-filter 
				component="filter"
				class="rack" collapsed label="Filter"></tone-filter>
			<tone-frequency-envelope 
				component="filterEnvelope"
				collapsed 
				label="Filter Envelope"></tone-frequency-envelope>
		`
	}
	
}

customElements.define('tone-mono-synth', ToneMonoSynth)
