import { LitElement, html } from '@polymer/lit-element'
import { ToneOfflineViz } from '../viz/offline-viz'

class ToneFilterViz extends ToneOfflineViz {

	constructor(){
		super()
		this.min = 0
		this.max = 2.5
		this.alt = 'filter response curve'
	}

	drawBackground(context, width, height){
		context.fillStyle = 'rgba(255, 255, 255, 0.3)'
		context.fillRect(0, height * 0.6, width, 3)
		context.fill()
	}

	async visualize(filter){
		//generate one cycle
		this.buffer = filter.getFrequencyResponse().map(v => Math.pow(v, 0.5))
		this.requestUpdate()
	}

}

customElements.define('tone-filter-viz', ToneFilterViz)
