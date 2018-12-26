import { LitElement, html } from '@polymer/lit-element'
import { ToneOfflineViz } from '../viz/offline-viz'

class ToneEnvelopeViz extends ToneOfflineViz {

	constructor(){
		super()
		this.min = 0
		this.max = 1.1
		this.duration = 0.1
		this.alt = 'envelope curve'
	}

	async visualize(envelope){
		//generate one cycle
		const options = envelope.get()
		const padding = 0.001
		const scalar = 1
		const totalTime = options.attack + options.decay + options.release
		const sustain = 0.01
		const buffer = await Tone.Offline(() => {
			const clone = new Tone.Envelope().toMaster()
			clone.set(options)
			clone.attack *= scalar
			clone.decay *= scalar
			clone.release *= scalar
			clone.toMaster()
			clone.triggerAttack(padding)
			clone.triggerRelease((options.attack + options.decay + sustain)*scalar + padding)
		}, (totalTime + sustain)*scalar + padding * 2)
		this.buffer = buffer.toArray(0)
		this.requestUpdate()
	}

}

customElements.define('tone-envelope-viz', ToneEnvelopeViz)
