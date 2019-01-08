import { LitElement, html } from '@polymer/lit-element'
import { resume } from '../util/resume'

const playSvg = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
const stopSvg = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>`

class TonePlayToggle extends LitElement {

	static get properties(){
		return {
			playing : { type : Boolean },
			disabled : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.playing = false
	}

	updated(changed){
		if (changed.has('playing')){
			this.dispatchEvent(new CustomEvent('change', { detail : this.playing, composed : true, bubbles : true }))
			this.dispatchEvent(new CustomEvent('play', { detail : this.playing, composed : true, bubbles : true }))
		}
	}

	bind(tone){
		this.addEventListener('change', e => {
			if (e.detail){
				tone.start()
			} else {
				tone.stop()
			}
		})
		setInterval(() => {
			if (tone.state === 'stopped'){
				this.playing = false
			}
		}, 100)
	}

	async _clicked(e){
		await resume(e)
		this.playing = !this.playing
	}
	
	render(){
		return html`
			<style>
				:host {
					display: inline-block;
					min-width: 80px;
					width: 100%;
				}

				#container {
					display: inline-block;
					width: 100%;
				}

				label {
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
					margin-right: 20px;
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

				button[disabled]{
					opacity: 0.5;
				}

				button svg {
					margin-top: 4px;
					width: 30px;
					height: 30px;
				}

			</style>
			<div id="container">
				<button 
					?disabled=${this.disabled}
					?playing=${this.playing}
					@click=${this._clicked.bind(this)}
					aria-label="Play" .aria-checked=${this.playing}>
					${!this.playing ? playSvg : stopSvg}
				</button>
			</div>
		`
	}

}

customElements.define('tone-play-toggle', TonePlayToggle)
