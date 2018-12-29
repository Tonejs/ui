import { LitElement, html } from '@polymer/lit-element'
import './unmute'

class ToneTopBar extends LitElement {

	constructor(){
		super()
	}

	updated(){
		const canvas = this.shadowRoot.querySelector('canvas')
		canvas.width = canvas.clientWidth * 2
		canvas.width = canvas.clientHeight * 2
		const { width, height } = canvas
		const context = canvas.getContext('2d')

		const waveform = randomWaveform(width+1)

		context.beginPath()
		waveform.forEach((v, x) => {
			const y = Math.scale(v, -1, 1, height * 0.25, height * 0.75)
			if (x === 0){
				context.moveTo(x, y)
			} else {
				context.lineTo(x, y)
			}
		})
		//complete the shape
		context.lineTo(width, height)
		context.lineTo(0, height)

		context.fillStyle = '#22DBC0'
		context.fill()
	}
	
	render(){
		return html`
			<style>

				:host {
					display: block;
					height: 44px;
					width: 100%;
				}

				#container {
					background-color: black;
					width: 100%;
					height: 100%;
				}

				#logo {
					color: white;
					font-family: 'Roboto Mono', monospace;
					font-size: 20px;
					line-height: 44px;
					margin-left: 60px;
					position: relative;
					display: inline-block;
				}

				#logo #text {
					display: inline-block;
					position: relative;
				}

				#logo canvas {
					position: absolute;
					right: -1px;
					background-color: #F734D7;
					height: 26px;
					width: 26px;
					top: 10px;
				}

				tone-unmute {
					position: fixed;
					top: 6px;
					right: 6px;
					z-index: 1000;
				}

			</style>
			<tone-unmute></tone-unmute>
			<div id="container">
				<a id="logo" href="https://tonejs.github.io">
					<canvas></canvas>
					<div id="text">Tone.js</div>
				</a>
			</div>
		`
	}

}

customElements.define('tone-top-bar', ToneTopBar)

function randomWaveform(bufferLength){

	const sine = new Array(bufferLength)
	const square = new Array(bufferLength)
	const sawtooth = new Array(bufferLength)
	const triangle = new Array(bufferLength)

	const choices = [sine, sawtooth, triangle, square]

	for (let i = 0; i < bufferLength; i++){
		sine[i] = Math.sin(Math.PI * 2 * i / bufferLength)
	}

	for (let i = 0; i < bufferLength; i++){
		sawtooth[i] = (((i + bufferLength/2) % bufferLength) / bufferLength) * 2 - 1
	}

	for (let i = 0; i < bufferLength; i++){
		if (i < bufferLength/3){
			triangle[i] = i/(bufferLength/3) * 2 - 1
		} else if (i < bufferLength * 2/3){
			triangle[i] = (1 - (i - bufferLength/3)/(bufferLength/3)) * 2 - 1
		} else {
			triangle[i] = (i - bufferLength * 2/3)/(bufferLength/3) * 2 - 1
		}
	}

	for (let i = 0; i < bufferLength; i++){
		const margin = bufferLength/16
		if (i < margin){
			square[i] = -1
		} else if (i < bufferLength/2){
			square[i] = 1
		} else if (i < (bufferLength - margin)){
			square[i] = -1
		} else {
			square[i] = 1
		}
	}

	return choices[Math.floor(Math.random()*choices.length)]
}
