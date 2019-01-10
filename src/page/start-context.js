import { LitElement, html } from '@polymer/lit-element'
import { resume } from '../util/resume'

const playSvg = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`

class ToneStartContext extends LitElement {

	static get properties(){
		return {
			running : { type : Boolean },
			disabled : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.running = false
	}

	firstUpdated(){
		const interval = setInterval(() => {
			this.running = Tone.context.state === 'running'
			if (this.running){
				clearInterval(interval)
			}
		}, 100)
	}

	async _clicked(e){
		await resume(e)
		this.running = Tone.context.state === 'running'
	}
	
	render(){
		return html`
			<style>
				:host {
					display: block;
					position: fixed;
					top: 10px;
					right: 10px;
				}

				#container {
					position: absolute;
					width: 44px;
					height: 44px;
					right: 0px;
					top: 0px;
					opacity: 1;
					transition: opacity 0.2s;
				}

				#container[running]{
					opacity: 0;
					pointer-events: none;
				}

				button {
					box-sizing: border-box;
					width: 100%;
					height: 44px;
					outline-color: var(--outline-color);
					border: 2px solid black;
					border-radius: 22px;
					padding: 0px;
					font-size: 30px;
					text-align: center;
					cursor: pointer;
					transition: box-shadow 0.1s;
					box-shadow: var(--shadow-low);
				}

				button:hover, button:focus {
					box-shadow: var(--shadow-medium);
				}

				button svg {
					margin-top: 4px;
					width: 30px;
					height: 30px;
				}

			</style>
			<div id="container" ?running=${this.running}>
				<button 
					@click=${this._clicked.bind(this)}
					aria-label="Start">
					${playSvg}
				</button>
			</div>
		`
	}

}

customElements.define('tone-start-context', ToneStartContext)
