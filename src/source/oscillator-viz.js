import { LitElement, html } from '@polymer/lit-element'
import { ToneOfflineViz } from '../viz/offline-viz'

class ToneVizOscillator extends ToneOfflineViz {

	constructor(){
		super()
		this.min = -1.1
		this.max = 1.1
		this.alt = 'oscillator waveform'
	}

	async visualize(oscillator){
		//generate one cycle
		const options = oscillator.get()
		const buffer = await global.Tone.Offline(() => {
			const clone = new oscillator.constructor(options)
			clone.frequency.value = 200	
			clone.detune.value = 0
			clone.volume.value = 0
			clone.toMaster().start(0).stop(0.005)
		}, 0.005)
		this.buffer = buffer.toArray(0)
		this.requestUpdate()
	}

}

customElements.define('tone-viz-oscillator', ToneVizOscillator)
