import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js'
import { LitElement, html } from '@polymer/lit-element'

export class ToneSelect extends LitElement {

	static get properties(){
		return {
			label : { type : String },
			attribute : { type : String }
		}
	}

	constructor(){
		super()
		this._observer = new FlattenedNodesObserver(this, () => this.requestUpdate())
	}

	get selectedIndex(){
		return this.shadowRoot.querySelector('select').selectedIndex
	}

	set selectedIndex(i){
		if (this.shadowRoot.querySelector('select')){
			this.shadowRoot.querySelector('select').selectedIndex = i
			this.requestUpdate()
		}
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

	render(){
		return html`
			<style>
				:host {
					display: block;
				}
				#container {
					height: 24px;
					display: inline-block;
					position: relative;
				}
				select {
					width: 100%;
					text-overflow: ellipses;
					display: inline-block;
					padding-right: 30px;
					font-size: 14px;
					padding-left: 10px;
					height: 24px;
					line-height: 18px;
					border-radius: 12px;
					-webkit-appearance: none;
					background-color: transparent;
					border:2px solid var(--border-color, var(--color-gray));
					box-sizing: border-box;
					outline-color: var(--outline-color);
					outline-offset: 1px;
				}
				#arrow {
					position: absolute;
					right: 8px;
					top: 8px;
					width: 10px;
					height: 10px;
					font-size: 8px;
					color: var(--border-color, var(--color-gray));
					pointer-events: none;
					line-height: 12px;
				}
			</style>
			<div id="container">
				<select @change=${() => this.dispatchEvent(new CustomEvent('change', { detail : this.value }))}>
					${Array.from(this.children).map(el => html`<option value=${el.value}>${el.textContent}</option> `)}
				</select>
				<div id="arrow">▼</div>
			</div>
		`
	}

}

customElements.define('tone-select', ToneSelect)
