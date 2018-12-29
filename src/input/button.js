import { LitElement, html } from '@polymer/lit-element'
import { resume } from '../util/resume'

class ToneButton extends LitElement {

	static get properties(){
		return {
			label : { type : String },
			disabled : { type : Boolean },
		}
	}

	constructor(){
		super()
	}

	_clicked(e){
		resume(e)
		if (this.disabled){
			e.stopPropagation()
		}
	}

	render(){
		return html`
			<style>
				:host {
					display: inline-block;
					min-width: 80px;
					width: 100%;
					--computed-button-height : var(--button-height, 44px);
				}

				#container {
					display: inline-block;
					width: 100%;
				}

				button {
					box-sizing: border-box;
					width: 100%;
					height: var(--computed-button-height);
					outline-color: var(--outline-color);
					border: 2px solid black;
					border-radius: calc(var(--computed-button-height) / 2);
					padding: 0px;
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
					text-align: center;
					cursor: pointer;
					transition: box-shadow 0.1s;
					box-shadow: var(--shadow-low);
				}

				button:not([disabled]):hover, button:not([disabled]):focus {
					box-shadow: var(--shadow-medium);
				}

				button:active {
					color: var(--color-gray);
					border-color: var(--color-gray);
				}

				button[disabled]{
					opacity: 0.5;
				}

			</style>
			<div id="container">
				<button 
					?disabled=${this.disabled}
					@click=${this._clicked.bind(this)}>
					${this.label}
				</button>
			</div>
		`
	}

}

customElements.define('tone-button', ToneButton)
