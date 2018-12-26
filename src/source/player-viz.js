import { LitElement, html } from '@polymer/lit-element'
import tinycolor from 'tinycolor2'

export class TonePlayerViz extends LitElement {

	static get properties(){
		return {
			color : { type : String },
			loading : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.color = 'black'
		this.loading = true
	}

	_computeRMS(buffer, width){
		if (this._waveform && this._waveform.length === width){
			return
		}
		const array = buffer.toArray(0)
		const length = 64
		const rmses = []
		for (let i = 0; i < width; i++){
			const offsetStart = Math.floor(Math.scale(i, 0, width, 0, array.length - length))
			const offsetEnd = offsetStart + length
			let sum = 0
			for (let s = offsetStart; s < offsetEnd; s++){
				sum += Math.pow(array[s], 2)
			}
			const rms = Math.sqrt(sum / length)
			rmses[i] = rms
		}
		const max = Math.max(...rmses)
		this._waveform = rmses.map(v => Math.scale(Math.pow(v, 0.8), 0, max, 0, 1))
	}

	visualize(tone){
		this.loading = !tone.loaded
		if (tone.loaded){
			const buffer = tone.buffer
			const canvas = this.shadowRoot.querySelector('canvas')
			canvas.width = canvas.clientWidth * 2
			canvas.height = canvas.clientHeight * 2
			const { width, height } = canvas
			const context = canvas.getContext('2d')
			context.clearRect(0, 0, width, height)
			this._computeRMS(buffer, width)
			
			const loopStart = Math.scale(tone.loopStart, 0, buffer.duration, 0, width)
			let loopEnd = Math.scale(tone.loopEnd, 0, buffer.duration, 0, width)
			if (tone.loopEnd === 0){
				loopEnd = width
			}
			context.fillStyle = this.color
			const lightened = tinycolor(this.color).setAlpha(0.2).toRgbString()
			this._waveform.forEach((val, i) => {
				const barHeight = val * height
				const x = tone.reverse ? width - i : i
				if (tone.loop){
					context.fillStyle = loopStart > x || x > loopEnd ? lightened : this.color
				}
				context.fillRect(x, height/2 - barHeight/2, 1, barHeight)
				context.fill()
			})
		}
	}

	render(){
		return html`
			<style>
				:host {
					display: inline-block;
					width: 60px;
					height: 20px;
					position: relative;
				}
				canvas {
					width: 100%;
					height: 100%;
				}

				#loading {
					position: absolute;
					bottom: 4px;
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
				}

				#loading[hidden]{
					display: none;
				}
			</style>
			<canvas>
				the audio file's waveform
			</canvas>
			<div id="loading" ?hidden=${!this.loading} style="color: ${this.color}">loading</div>
		`
	}

}

customElements.define('tone-player-viz', TonePlayerViz)
