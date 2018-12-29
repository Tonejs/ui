import { LitElement, html } from '@polymer/lit-element'

export class ToneLoop extends LitElement {

	static get properties(){
		return {
			color : { type : String },
		}
	}

	constructor(){
		super()
		this.color='#777'
	}

	bind(tone){
		
		this._canvas = this.shadowRoot.querySelector('canvas')
		this._canvas.width = this._canvas.clientWidth * 2
		this._canvas.height = this._canvas.clientHeight * 2
		this._context = this._canvas.getContext('2d')
		this.loop(tone)

		window.addEventListener('resize', () => {
			this._canvas.width = this._canvas.clientWidth * 2
			this._canvas.height = this._canvas.clientHeight * 2
		})
	}

	loop(tone){
		requestAnimationFrame(this.loop.bind(this, tone))
		const { width, height } = this._canvas
		const context = this._context
		context.clearRect(0, 0, width, height)
		context.fillStyle = '#eee'
		const minDim = Math.min(width, height)
		context.arc(width/2, height/2, minDim/2, 0, Math.PI * 2, false)
		context.fill()

		const progress = tone.progress

		//the progress
		context.beginPath()
		context.fillStyle = this.color
		context.moveTo(width/2, height/2)
		const quarterCircle = Math.PI / 2
		context.arc(width/2, height/2, minDim/2, -quarterCircle, progress * Math.PI * 2 - quarterCircle, false)
		context.fill()
	}

	render(){
		return html`
			<style>
				:host {
					display: inline-block;
					width: 45px;
					height: 24px;
					border-radius: 4px;
					padding: 4px;
					box-sizing: border-box;
					overflow: hidden;
				}
				#container {
					width: 100%;
					height: 100%;
					display: inline-block;
				}
				canvas {
					width: 100%;
					height: 100%;
				}
			</style>
			<div id="container">
				<canvas class=${this.level ? 'hasLevel' : ''}>
					audio meter level
				</canvas>
			</div>
		`
	}

}

customElements.define('tone-loop', ToneLoop)
