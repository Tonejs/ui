import { LitElement, html } from '@polymer/lit-element'
import { Waveforms } from './waveforms'

class ToneWaveform extends LitElement {

	constructor(){
		super()

		this._waveform = Waveforms(512).random

		/**
		 *  The waveform analysis of the incoming signal
		 *  @type  {Tone.Waveform}
		 */
		this._analyser = new Tone.Waveform(512)

		/**
		 *  A signal to make the analyser rest
		 *  at 0 when nothing is connected
		 *  @private
		 */
		this._signal = new Tone.Zero().connect(this._analyser)

		/**
		 *  the value below which it is considered silent
		 */
		this._silentThresh = 0.001

		/**
		 *  The current RMS of the incoming signal
		 */
		this._rms = 0
	}

	firstUpdated(){
		super.firstUpdated()
		//kick off the loop
		this._loop()
	}

	bind(source){
		source.connect(this._analyser)
	}

	_loop(){
		requestAnimationFrame(this._loop.bind(this))
		const canvas = this.shadowRoot.querySelector('canvas')
		const conatiner = this.shadowRoot.querySelector('#container')
		const context = canvas.getContext('2d')
		canvas.width = conatiner.clientWidth * 2
		canvas.height = conatiner.clientHeight * 2

		//if it's silent, draw a canned waveform when the mouse is over
		const analysis = this._analyser.getValue()
		if (this._isSilent(analysis)){
			this._drawAnalysis(this._waveform, true, context)
		} else { //if it's not silent, draw the waveform
			this._drawAnalysis(analysis, false, context)
		}
	}

	_isSilent(analysis){
		//if the average is close to 128
		let total = 0
		for (let i = 0; i < analysis.length; i++){
			total += Math.pow(analysis[i], 2)
		}
		const rms = Math.sqrt(total / analysis.length)
		this._rms = Math.max(rms, this._rms * 0.9)
		return this._rms < this._silentThresh
	}

	_drawAnalysis(analysis, silent, context){
		const { width, height } = context.canvas

		let margin = height * 0.2
		if (silent){
			margin = Math.scale(this._rms, 0, this._silentThresh, height * 0.2, height * 0.5)
		}

		context.clearRect(0, 0, width, height)
		context.beginPath()

		let firstValue
		for (let i = 0, len = analysis.length; i < len; i++){
			const x = Math.scale(i, 0, len - 1, 0, width)
			const y = Math.scale(analysis[i], -1, 1, height - margin, margin)
			if (i === 0){
				firstValue = y
				context.moveTo(x, y)
			} else {
				context.lineTo(x, y)
			}
		}
		context.lineTo(width, height)
		context.lineTo(0, height)
		context.lineTo(0, firstValue)
		context.lineCap = 'round'
		// context.stroke();
		context.fillStyle = '#22DBC0'
		context.fill()
	}
	
	render(){
		return html`
			<style>

				:host, #container, canvas {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0px;
					left: 0px;
				}

				#container {
					background-color: var(--color-magenta);
				}

			</style>
			<div id="container">
				<canvas></canvas>
			</div>
		`
	}

}

customElements.define('tone-waveform', ToneWaveform)
