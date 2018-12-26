import { LitElement, html } from '@polymer/lit-element'

export class ToneOfflineViz extends LitElement {

	static get properties(){
		return {
			buffer : { type : Array },
			alt : { type : String },
			min : { type : Number },
			max : { type : Number },
			color : { type : String }
		}
	}

	constructor(){
		super()
		this.min = -1.1
		this.max = 1.1
		this.buffer = new Float32Array(100)
		this.color='black'
	}

	drawBackground(context, width, height){}

	async visualize(component){}

	updated(){
		const canvas = this.shadowRoot.querySelector('canvas')
		const context = canvas.getContext('2d')
		const width = canvas.clientWidth * 2
		const height = canvas.clientHeight * 2
		canvas.width = width
		canvas.height = height
		context.clearRect(0, 0, width, height)
		//draw the background
		this.drawBackground(context, width, height)

		const lineWidth = 4
		context.lineWidth = lineWidth
		context.beginPath()
		this.buffer.forEach((v, i) => {
			const x = Math.scale(i, 0, this.buffer.length, lineWidth, width-lineWidth)
			const y = Math.scale(v, this.max, this.min, 0, height-lineWidth)
			if (i === 0){
				context.moveTo(x, y)
			} else {
				context.lineTo(x, y)
			}
		})
		context.lineCap = 'round'
		context.strokeStyle = this.color
		context.stroke()
	}

	render(){
		return html`
			<style>
				:host {
					display: inline-block;
					width: 40px;
					height: 20px;
				}
				canvas {
					width: 100%;
					height: 100%;
				}
			</style>
			<canvas>
				${this.alt}
			</canvas>
		`
	}

}
