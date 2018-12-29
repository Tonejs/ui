import { LitElement, html } from '@polymer/lit-element'
import { ToneSelect } from './select'

export class ToneSelectAttribute extends ToneSelect {

	static get properties(){
		return {
			label : { type : String },
			attribute : { type : String },
		}
	}

	constructor(){
		super()
		this.label=''
	}

	sync(node){
		this.value = node[this.attribute]
	}

	set(node){
		if (node[this.attribute] !== this.value){
			node[this.attribute] = this.value
		}
	}

	render(){

		return html`
			<style>
				#attribute-container {
					display: block;
					height: 24px;
				}
				label, #container {
					height: 24px;
					line-height: 24px;
					display: block;
				}
				label {
					float: left;
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
				}
				#container {
					float: right;
				}
			</style>
			<div id="attribute-container">
				<label>${this.label}</label>
				${super.render()}
			</div>
		`
	}

}

customElements.define('tone-select-attribute', ToneSelectAttribute)
