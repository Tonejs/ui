import { LitElement, html } from '@polymer/lit-element'

export class ToneOscilloscope extends LitElement {

	constructor(){
		super()
		this._waveform = new Tone.Waveform(256)
	}

	bind(tone){
		tone.connect(this._waveform)
		this._canvas = this.shadowRoot.querySelector('canvas')
		this._canvas.width = this._canvas.clientWidth * 2
		this._canvas.height = this._canvas.clientHeight * 2
		this._context = this._canvas.getContext('2d')
		this.loop()

		window.addEventListener('resize', () => {
			this._canvas.width = this._canvas.clientWidth * 2
			this._canvas.height = this._canvas.clientHeight * 2
		})
	}

	loop(){
		requestAnimationFrame(this.loop.bind(this))
		const value = this._waveform.getValue()
		const width = this._canvas.width
		const height = this._canvas.height
		this._context.clearRect(0, 0, width, height)
		this._context.beginPath()
		const lineWidth = 4
		this._context.lineWidth = lineWidth
		value.forEach((v, i) => {
			const x = Math.scale(i, 0, value.length, 0, width)
			const y = Math.scale(v, -1, 1, 0, height)
			if (i === 0){
				this._context.moveTo(x, y)
			} else {
				this._context.lineTo(x, y)
			}
		})
		this._context.lineCap = 'round'
		this._context.strokeStyle = 'white'
		this._context.stroke()
	}

	render(){
		return html`
			<style>
				:host {
					display: inline-block;
					width: 45px;
					height: 24px;
					border-radius: 15px;
					padding: 4px;
					box-sizing: border-box;
					background-color: #aaa;
					overflow: hidden;
				}
				canvas {
					width: 100%;
					height: 100%;
				}
			</style>
			<canvas>
				waveform of current playing audio
			</canvas>
		`
	}

}

customElements.define('tone-oscilloscope', ToneOscilloscope)
