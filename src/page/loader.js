import { LitElement, html } from '@polymer/lit-element'

class ToneLoader extends LitElement {

	static get properties(){
		return {
			loaded : { type : Boolean },
			progress : { type : Number }
		}
	}

	constructor(){
		super()

		this.progress = 0
		this.loaded = false

		Tone.Buffer.on('progress', e => {
			this.progress = e
		})

		Tone.loaded().then(() => {
			this.loaded = true
			setTimeout(() => {
				this.remove()
			}, 500)
		})
	}
	
	render(){
		return html`
			<style>
				#container {
					position: fixed;
					top: 0px;
					left: 0px;
					bottom: 0px;
					right: 0px;
					z-index: 100000;
					background-color: rgba(0, 0, 0, 0.5);
					opacity: 1;
					transition: opacity 0.3s;
				}

				#container.loaded {
					opacity: 0;
					pointer-events: none;
				}

				#loader {
					width: 200px;
					height: 10px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-color: white;
					padding: 2px;
				}

				#bar {
					background-color: black;
					width: 0%;
					height: 100%;
					transition: width 0.1s;
				}

			</style>
			<div id="container" class=${this.loaded ? 'loaded' : ''}>
				<div id="loader" 
					role="progressbar" 
					aria-valuenow=${this.progress} 
					aria-valuemin="0" aria-valuemax="100">
						<div id="bar" style="width: ${(this.progress * 100).toString()}%"></div>
				</div>
			</div>
		`
	}

}

customElements.define('tone-loader', ToneLoader)
