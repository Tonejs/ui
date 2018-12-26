import { LitElement, html } from '@polymer/lit-element'

export class ToneMeter extends LitElement {

	static get properties(){
		return {
			stereo : { type : Boolean },
			level : { type : Boolean },
			color : { type : String },
		}
	}

	constructor(){
		super()
		this.color='#777'
	}

	bind(tone){
		const channels = this.stereo ? 2 : 1
		if (this.stereo){
			const split = new Tone.Split()
			tone.connect(split)
			this._meters = [new Tone.Meter(0.9), new Tone.Meter(0.9)]
			split.left.connect(this._meters[0])
			split.right.connect(this._meters[1])
		} else {
			this._meters = [new Tone.Meter(0.9)]
			tone.connect(this._meters[0])
		}
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
		const { width, height } = this._canvas
		const values = this._meters.map(m => m.getLevel())
		const barHeights = values.map(value => Math.clamp(Math.scale(value, -100, 6, 0, height), 4, height))
		this._context.clearRect(0, 0, width, height)
		const barWidth = width / this._meters.length
		this._context.fillStyle = this.color
		const margin = this._meters.length > 1 ? 5 : 0
		barHeights.forEach((barHeight, i) => {
			this._context.fillRect(i * barWidth + margin*i, height - barHeight, barWidth - margin, barHeight)
		})
		if (this.level){
			Array.from(this.shadowRoot.querySelectorAll('.level')).forEach((el, i) => {
				let val = values[i]
				if (val < -100){
					val = -Infinity
				}
				el.textContent = val.toFixed(2)
			})
		}
	}

	render(){
		let levels = html``
		if (this.level){
			if (this.stereo){
				levels = html`
					<div class="level">-Infinity</div>
					<div class="level">-Infinity</div>
				` 
			} else {
				levels = html`
					<div class="level">-Infinity</div>
				` 
			}
		}
		return html`
			<style>
				:host {
					display: inline-block;
					width: 45px;
					height: 24px;
					border-radius: 4px;
					padding: 4px;
					box-sizing: border-box;
					background-color: #aaa;
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
				canvas.hasLevel {
					height: calc(100% - 15px);
				}
				#level {
					height: 10px;
					line-height: 10px;
					display: flex;
				}
				.level {
					flex-grow: 1;
					font-family: monospace;
					font-size: 10px;
					text-align: center;
				}
			</style>
			<div id="container">
				<canvas class=${this.level ? 'hasLevel' : ''}>
					audio meter level
				</canvas>
				${this.level ? html`
					<div id="level" style="color:${this.color}">${levels}</div>` : html``}
			</div>
		`
	}

}

customElements.define('tone-meter', ToneMeter)
