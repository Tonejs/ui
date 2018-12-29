import { LitElement, html } from '@polymer/lit-element'
import './slider'

class TonePosition extends LitElement {

	static get properties(){
		return {
			position : { type : Number },
			min : { type : Number },
			max : { type : Number },
		}
	}

	constructor(){
		super()
		this.position = 0
		this.min = 0
		this.max = 1
		this._dragging = false
	}

	bind(tone){
		this.tone = tone
		this.loop(tone)
	}

	updated(changed){
		if (changed.has('position')){
			const position = Math.scale(this.position, this.min, this.max, 0, 1)
			this.dispatchEvent(new CustomEvent('position', { detail : position, composed : true }))
		}
	}

	loop(tone){
		requestAnimationFrame(this.loop.bind(this, tone))
		if (!this._dragging){
			this.position = tone.progress
		}
	}

	_change(e){
		this._dragging = true
		clearTimeout(this._dragTimeout)
		this._dragTimeout = setTimeout(() => this._dragging = false, 200)
		if (this.tone){
			const progress = Math.scale(e.detail, this.min, this.max, 0, this.tone.loopEnd)
			this.tone.seconds = progress
			this.position = this.tone.progress
		}
	}

	render(){
		return html`
			<style>
				:host {
					display: block;
				}

				tone-slider {
					display: block;
					width: 100%;
				}

			</style>
			<div id="container">
				<tone-slider
					.value=${this.position}
					@input=${this._change.bind(this)}
					.min=${this.min}
					.max=${this.max}
					bare>
				</tone-slider>
			</div>
		`
	}

}

customElements.define('tone-position', TonePosition)
