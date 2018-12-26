import { LitElement, html } from '@polymer/lit-element'
import { ToneSelect } from './select'

export class ToneSelectAttribute extends LitElement {

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

	get selectedIndex(){
		return this.shadowRoot.querySelector('tone-select').selectedIndex
	}

	set selectedIndex(i){
		this.shadowRoot.querySelector('tone-select').selectedIndex = i
	}

	get value(){
		return this.children[this.selectedIndex].getAttribute('value')
	}

	set value(s){
		const index = Array.from(this.children).findIndex(i => i.getAttribute('value') === s.toString())
		if (index !== -1){
			this.selectedIndex = index
		}
	}

	sync(node){
		this.value = node[this.attribute]
	}

	set(node){
		node[this.attribute] = this.value
	}

	updated(changed){
		
	}

	render(){

		return html`
			<style>
				#container {
					display: block;
					height: 24px;
				}
				label, tone-select {
					height: 24px;
					line-height: 24px;
					display: block;
				}
				label {
					float: left;
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
				}
				tone-select {
					float: right;
				}
			</style>
			<div id="container">
				<label>${this.label}</label>
				<tone-select @change=${e => this.dispatchEvent(new CustomEvent('change', { composed : true, detail : this.value, bubbles : true }))}>
					${Array.from(this.children).map(c => html`
							<tone-option value=${c.value}>${c.textContent}</tone-option>
						`)}
				</tone-select>
			</div>
		`
	}

}

customElements.define('tone-select-attribute', ToneSelectAttribute)
