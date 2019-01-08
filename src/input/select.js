import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js'
import { LitElement, html } from '@polymer/lit-element'

const arrowDown = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`

export class ToneSelect extends LitElement {

	static get properties(){
		return {
			selectedIndex : { type : Number },
			attribute : { type : String }
		}
	}

	constructor(){
		super()
		this.selectedIndex = -1
		this.options = []
		this._observer = new FlattenedNodesObserver(this, (e) => {
			this.options = [...this.options, ...e.addedNodes.filter(el => el.nodeName.toLowerCase() === 'option')]
			if (this.options.length && this.selectedIndex === -1){
				this.selectedIndex = 0
			}
			this.requestUpdate()
		})
	}

	updated(changed){
		if (changed.has('selectedIndex') && this.selectedIndex !== -1){
			const select = this.shadowRoot.querySelector('select')
			this.dispatchEvent(new CustomEvent('change', { detail : this.value, composed : true, bubbles : true }))
			if (select){
				select.selectedIndex = this.selectedIndex
			}
			if (this.attribute){
				this.dispatchEvent(new CustomEvent(this.attribute, { detail : this.value, composed : true, bubbles : true }))
			}
		}
	}

	get value(){
		return this.options[this.selectedIndex].getAttribute('value')
	}

	set value(s){
		const index = this.options.findIndex(i => i.getAttribute('value') === s.toString())
		if (index !== -1){
			this.selectedIndex = index
		}
	}

	sync(node){
		this.value = node[this.attribute]
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
					right: 15px;
					top: 0px;
					width: 10px;
					height: 10px;
					font-size: 8px;
					color: var(--border-color, var(--color-gray));
					pointer-events: none;
					line-height: 12px;
				}

				#arrow svg {
					fill: var(--border-color, var(--color-gray));
				}
			</style>
			<div id="container">
				<select @change=${e => this.selectedIndex = e.target.selectedIndex}>
					${this.options}
				</select>
				<div id="arrow">${arrowDown}</div>
			</div>
		`
	}

}

customElements.define('tone-select', ToneSelect)
