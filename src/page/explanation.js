import { LitElement, html } from '@polymer/lit-element'

class ToneExplanation extends LitElement {

	static get properties(){
		return {
			label : { type : String },

		}
	}

	constructor(){
		super()
	}
	
	render(){
		return html`
			<style>

				:host {
					display: block;
					width: 100%;
					margin-top: 8px;
					box-shadow: var(--shadow-low);
					background-color: var(--color-light-gray);
					margin-bottom: 30px;
				}

				#container {
					width: 100%;
					height: auto;
				}

				#title {
					width: calc(100% - 20px);
					padding: 5px;
					margin: 5px;
					font-family: var(--title-font-family);
					font-size: var(--title-font-size);
					font-weight: normal;
					border-bottom: 2px solid black;
				}

				#body {
					min-height: 20px;
					padding: 10px;
				}

				::slotted(text){
					font-family: var(--body-font-family);
					font-size: var(--body-font-size);
				}

				::slotted(code){
					font-family: monospace;
				}

				::slotted(a){
					color: var(--color-magenta);
				}

			</style>
			<div id="container">
				<h2 id="title">${this.label}</h2>
				<div id="body">
					<slot></slot>
				</div>
			</div>
		`
	}

}

customElements.define('tone-explanation', ToneExplanation)
