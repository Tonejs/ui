import { LitElement, html } from '@polymer/lit-element'
// import ClipboardJS from 'clipboard'
import nestedObjectAssign from 'nested-object-assign'

class TonePresets extends LitElement {

	static get properties(){
		return {
			label : { type : String },
			presets : { type : String },
		}
	}

	constructor(){
		super()
		this.label = 'Presets'
		this.presets = JSON.stringify('[]')
		this._options = {}
	}

	bind(tone){
		this.addEventListener('preset', e => {
			const clone = new tone.constructor()
			const defaults = clone.get()
			clone.dispose()
			const detail = nestedObjectAssign({}, defaults, e.detail)
			tone.set(detail)
			this.dispatchEvent(new CustomEvent('sync', { detail : detail, composed : true, bubbles : true }))
		})

		/*this._clipboard = new ClipboardJS(this.shadowRoot.querySelector('#copy'), {
			text : () => {
				return JSON.stringify(tone.get(), undefined, '\t')
			}
		})*/
	}

	_clicked(e, p){
		const detail = Object.assign({}, p)
		this.dispatchEvent(new CustomEvent('preset', { detail, composed : true, bubbles : true }))
	}
	
	render(){
		if (this.presets !== 'undefined'){
			const presets = JSON.parse(this.presets)
			return html`
				<style>
					:host {
						display: block;
					}

					#container {
						display: flex;
					}

					#label {
						height: 20px;
						line-height: 20px;
						margin-left: 10px;
						margin-right: 10px;
					}

					#label, button {
						font-family: var(--label-font-family);
						font-size: var(--label-font-size);
						display: inline-block;
						color: var(--color-dark-gray);
					}

					#presets {
						display: inline-block;
					}

					button {
						font-family: monospace;
						border: none;
						-webkit-appearance: none;
						width: 20px;
						height: 20px;
						border: 2px solid var(--color-dark-gray);
						padding-left: 5px;
						color: var(--color-dark-gray);
						border-radius: 10px;
						text-align: center;
						background-color: transparent;
						font-size: 10px;
						outline-color: var(--outline-color);
						margin-left: 5px;
						margin-bottom: 5px;
						font-weight: bold;
					}

					button#copy {
						width: 40px;
						font-family: var(--label-font-family);
					}

					button.selected {
						background-color: white;
					}

					button:active {
						color: var(--color-gray);
						border-color: var(--color-gray);
					}
				</style>
				<div id="container">
					<div id="label">${this.label}</div>
					<div id="presets">
						${presets.map((p, i) => html`
							<button @click=${e => this._clicked(e, p)}>
								${(i+1).toString()}
							</button>`)}
						<!--button id="copy">copy</button-->
					</div>
				</div>
			`
		} else {
			return html``
		}
	}

}

customElements.define('tone-presets', TonePresets)
