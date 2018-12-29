import { LitElement, html } from '@polymer/lit-element'
import { ToneEffect } from './effect'

class TonePingPongDelay extends ToneEffect {

	constructor(){
		super()
		this.label = 'PingPongDelay'
	}

	renderAttributes(){
		return html`
			<tone-slider 
				label="Delay Time"
				attribute="delayTime"
				min="0.01"
				max="1"
				value="0.25"></tone-slider>
			<tone-slider 
				label="Feedback"
				attribute="feedback"
				min="0"
				max="0.95"
				value="0.5"></tone-slider>
		`
	}
	
}

customElements.define('tone-ping-pong-delay', TonePingPongDelay)
