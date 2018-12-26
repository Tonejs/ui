import { LitElement, html } from '@polymer/lit-element'
import { resume } from '../util/resume'

class TonePlayToggle extends LitElement {

	static get properties(){
		return {
			playing : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.playing = false
	}

	updated(changed){
		if (changed.has('playing')){
			this.dispatchEvent(new CustomEvent('change', { detail : this.playing, composed : true, bubbles : true }))
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

	_clicked(){
		resume()
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

				button:not([playing]){
					padding-left: 4px;
				}
				button[playing]{
					padding-top: 2px;
				}

			</style>
			<div id="container">
				<button 
					?playing=${this.playing}
					@click=${this._clicked.bind(this)}
					aria-label="Play" .aria-checked=${this.playing}>
					${this.playing ? html`&#x25FC;&#xFE0E;` : html`&#x25B6;&#xFE0E;`}
				</button>
			</div>
		`
	}

}

customElements.define('tone-play-toggle', TonePlayToggle)
