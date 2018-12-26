import { LitElement, html } from '@polymer/lit-element'

class ToneRack extends LitElement {

	static get properties(){
		return {
			collapsed : { type : Boolean },
			incollapsable : { type : Boolean },
			square : { type : Boolean },
			label : { type : String },
			color : { type : String },
		}
	}

	constructor(){
		super()
		this.incollapsable = false
		this.collapsed = false
		this.square = false
	}

	updated(changed){

		const dispatchCollapseEvent = (el) => {
			el.dispatchEvent(new CustomEvent('collapse', { detail : this.collapsed, composed : true, bubbles : true }))
		}

		if (changed.has('collapsed')){
			// console.log('collapsed', this.collapsed)
			dispatchCollapseEvent(this)

			Array.from(this.children).forEach(e => {
				if (e.assignedNodes){
					Array.from(e.assignedNodes()).forEach(el => dispatchCollapseEvent(el))
				} else {
					dispatchCollapseEvent(e)
				}
				e.dispatchEvent(new CustomEvent('collapse', { detail : this.collapsed, composed : true, bubbles : true }))
			})
		}
	}

	_keydown(e){
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown'){
			this.collapsed = false
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
			this.collapsed = true
		}
	}

	render(){
		return html`
			<style>
				:host {
					display: block;
					min-width: 300px;
					width: 100%;
				}
				button {
					position: absolute;
					top: 18px;
					left: 18px;
					border: none;
					-webkit-appearance: none;
					width: 10px;
					height: 10px;
					text-align: left;
					margin: 0;
					padding: 0;
					transform: translate(0, -50%);
					outline-color: var(--outline-color);
					background-color: transparent;
				}

				#container {
					box-sizing: border-box;
					position: relative;
					border: 2px solid black;
					border-radius: 22px;
					padding: 20px;
					background-color: white;
					width: 100%;
				}

				#container[square]{
					border-radius: 0px;
					background-color: #eee;
					padding: 30px 5px 5px 5px;
					border-color: #eee;
				}

				#padding {
					height: 10px;
				}

				#container.closed {
					height: 0px;
					overflow: hidden;
					padding: 20px;
				}

				#label {
					position: absolute;
					left: 45px;
					top: 12px;
					font-family: var(--title-font-family);
					font-size: var(--title-font-size);
					font-weight: normal;
					margin: 0;
				}
				#label[hidden]{
					display: none;
				}

				#container.closed::slotted:not([top]){
					display: none;
				}
				
			</style>
			<div id="container" class=${this.collapsed ? 'closed' : 'open'} ?square=${this.square}>
				${!this.incollapsable ? html`
					<button 
						@keydown=${this._keydown.bind(this)}
						@click=${() => this.collapsed = !this.collapsed}
						aria-label='collapse menu'
						role="checkbox" aria-checked="${this.collapsed}">${!this.collapsed ? html`&#x25BC;&#xFE0E;` : html`&#x25B6;&#xFE0E;`}</button>` : html``}
				<h2 id="label">${this.label}</h2>
				<div id="padding"></div>
				<slot name="top"></slot>
				${this.collapsed ? html`` : html`<slot></slot>`}
			</div>
		`
	}

}

customElements.define('tone-rack', ToneRack)
