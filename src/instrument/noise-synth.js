import { LitElement, html } from '@polymer/lit-element'
import '../component/envelope'
import '../component/frequency-envelope'
import '../rack/rack'
import { ToneInstrument } from './instrument'

class ToneNoiseSynth extends ToneInstrument {

	constructor(){
		super()
		this.label = 'NoiseSynth'
	}

	renderAttributes(){
		return html`
			<tone-noise 
				label="Noise"
				collapsed
				component="noise"></tone-noise>
			<tone-envelope 
				component="envelope" 
				collapsed 
				label="Envelope"></tone-envelope>
		`
	}
	
}

customElements.define('tone-noise-synth', ToneNoiseSynth)
