import { LitElement, html } from '@polymer/lit-element'
import { resume } from '../util/resume'

class ToneTrigger extends LitElement {

	static get properties(){
		return {
			triggered : { type : Boolean },
			disabled : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.triggered = false
	}

	updated(changed){
		if (changed.has('triggered')){
			this.dispatchEvent(new CustomEvent('change', { detail : this.triggered, composed : true, bubbles : true }))
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
	}

	_mousedown(e){
		resume(e)
		if (e.type === 'touchstart'){
			e.preventDefault()
		}
		this.triggered = true
	}

	_keydown(e){
		resume(e)
		if (e.key === ' ' || e.key === 'Enter'){
			this.triggered = true
		}
	}

	_keyup(e){
		if (e.key === ' ' || e.key === 'Enter'){
			this.triggered = false
		}
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
					position: relative;
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

				button #ring {
					width: 20px;
					height: 20px;
					position: absolute;
					border-radius: 50%;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					border: 2px solid black;
					box-sizing: border-box;
					transition: all 0.1s;
				}

				button[triggered] #ring {
					width: 30px;
					height: 30px;
				}

				button #circle {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					width: 100%;
					height: 100%;
					border-radius: 50%;
					transition: all 0.1s;
					background-color: black;
				}

				button[triggered] #circle {
					width: 0px;
					height: 0px;
				}

				button[disabled] {
					opacity: 0.5;
				}

			</style>
			<div id="container">
				<button 
					?disabled=${this.disabled}
					?triggered=${this.triggered}
					@keydown=${this._keydown.bind(this)}
					@keyup=${this._keyup.bind(this)}
					@mousedown=${this._mousedown.bind(this)}
					@touchstart=${this._mousedown.bind(this)}
					@mouseup=${() => this.triggered = false}
					@touchend=${() => this.triggered = false}
					aria-label="Trigger" .aria-checked=${this.triggered}>
					<div id="ring">
						<div id="circle"></div>
					</div>
					
				</button>
			</div>
		`
	}

}

customElements.define('tone-trigger', ToneTrigger)
