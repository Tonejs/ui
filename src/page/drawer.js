import { LitElement, html } from '@polymer/lit-element'

const minimizeSvg = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
const maximizeSvg = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`

class ToneDrawer extends LitElement {

	static get properties(){
		return {
			collapsed : { type : Boolean },
			label : { type : String },
		}
	}

	constructor(){
		super()
		this.collapsed = window.innerHeight < 700
		this.label = 'Components'
	}

	updated(changed){
		if (changed.has('collapsed') && !this.collapsed){
			const dispatchCollapseEvent = (el) => {
				el.dispatchEvent(new CustomEvent('collapse', { detail : this.collapsed, composed : true, bubbles : true }))
			}
			Array.from(this.children).forEach(e => {
				if (e.assignedNodes){
					Array.from(e.assignedNodes()).forEach(el => dispatchCollapseEvent(el))
				} else {
					dispatchCollapseEvent(e)
				}
				e.dispatchEvent(new CustomEvent('collapse', { detail : this.collapsed, composed : true, bubbles : true }))
			})

			window.dispatchEvent(new CustomEvent('resize'))
		}
	}
	
	render(){
		return html`
			<style>

				:host {
					display: block;
					width: 100%;
					max-height: 100%;
					position: fixed;
					bottom: 0px;
					left: 0px;
					overflow-y: auto;
					background-color: white;
					z-index: 100;
				}

				button {
					padding: 0px;
					width: calc(100% - 24px);
					-webkit-appearance: none;
					background-color: white;
					border: none;
					outline-color: var(--outline-color);
					margin-left: 12px;
					margin-top: 8px;
				}

				button svg {
					width: 24px;
					float: left;
					height: 100%;
				}

				#content {
					width: 100%;
					display: block;
					border-top: 2px solid black;
					box-shadow: var(--shadow-high);
					position: relative;
					z-index: 10000;
				}

				#content[collapsed]{
					height: 40px;
					overflow: hidden;
				}

				#slots {
					padding: 0 10px 10px 10px;
					width: calc(100% - 20px);
					display: block;
				}

				h2 {
					font-weight: normal;
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
					display: inline-block;
					position: absolute;
					margin: 0px;
					top: 12px;
					left: 50px;
					pointer-events: none;
				}

				::slotted(*) {
					margin-top: 10px;
					display: block;
				}

			</style>
			<div id="content" ?collapsed=${this.collapsed}>
				<button 
					aria-label="expand"
					aria-checked=${this.collapsed}
					@click=${() => this.collapsed = !this.collapsed}>
					${this.collapsed ? maximizeSvg : minimizeSvg}
				</button>
				<h2>${this.label}</h2>
				<div id="slots">
					${this.collapsed ? html`` : html`<slot></slot>`}
				</div>
			</div>
		`
	}

}

customElements.define('tone-drawer', ToneDrawer)
