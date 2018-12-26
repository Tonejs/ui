import { LitElement, html } from '@polymer/lit-element'

export class ToneFFT extends LitElement {

	constructor(){
		super()
		this._fft = new Tone.FFT(256)
	}

	bind(tone){
		tone.connect(this._fft)
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
		const value = this._fft.getValue()
		const width = this._canvas.width
		const height = this._canvas.height
		this._context.clearRect(0, 0, width, height)
		const lineWidth = 4
		this._context.fillStyle = 'white'
		value.forEach((v, i) => {
			const x = Math.scale(i, 0, value.length, 0, width)
			const barHeight = Math.clamp(Math.scale(v, -100, 0, 0, height), 0, height)
			this._context.fillRect(x, height/2 - barHeight/2, 2, barHeight)			
			this._context.fill()
		})
		// this._context.strokeStyle = 'white'
		// this._context.stroke()
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

customElements.define('tone-fft', ToneFFT)
