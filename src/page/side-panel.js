import { LitElement, html } from '@polymer/lit-element'

const closeSvg = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
const menuSvg = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`

class ToneSidePanel extends LitElement {

	static get properties(){
		return {
			collapsed : { type : Boolean }
		}
	}

	constructor(){
		super()
		this.collapsed = true
		this.examples = {}
		this.fetchExamples()
	}

	async fetchExamples(){
		try {
			const response = await fetch('./js/ExampleList.json')
			this.examples = await response.json()
			this.requestUpdate()
		} catch (e){
			console.log('could not load example list')
		}
	}

	updated(changed){
		if (changed.has('collapsed')){
			this.dispatchEvent(new CustomEvent('collapse', { detail : this.collapsed, composed : true }))
		}
	}
	
	render(){
		const loading = Object.keys(this.examples).length === 0
		return html`
			<style>
				:host {
					display: inline-block;
					position: relative;
				}

				#container {
					width: var(--side-panel-width);
					height: 100%;
					left: 0px;
					top: 0px;
					position: absolute;
					background-color: black;
					transition: width var(--side-panel-transition), box-shadow var(--side-panel-transition);
					box-shadow: var(--shadow-high);
					overflow: auto;
					overflow-x: hidden;
					color: white;
				}

				#content {
					min-width: 200px;
				}

				h2, h3 {
					background-color: black;
					color: white;
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
					margin: 0px auto;
				}

				h2 {
					font-size: var(--title-font-size);
					margin: 20px 10px;
				}

				h3 {
					width: 90%;
					padding: 2px 5px;
					font-weight: bold;
					border-bottom: 2px solid white;
				}

				ul {
					padding: 0px 5px 10px;
					margin: 5px;
				}

				li {
					list-style-type: none;
					margin: 0px;
					padding: 0px;
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
				}

				li a {
					color: white;
					text-decoration: none;
				}

				#close {
					position: absolute;
					right: 5px;
					top: 12px;
					background-color: transparent;
					border: none;
					outline-color: var(--outline-color);
					-webkit-appearance: none;
					transition: right var(--side-panel-transition);
				}

				#close svg {
					fill: white;
				}

				[collapsed] #close {
					right: -48px;
				}

				#container[collapsed]{
					overflow: visible;
					box-shadow: none;
				}

				#loading {
					margin-left: 20px;
				}

			</style>
			<div id="container" ?collapsed=${this.collapsed}>
				<button id="close" 
					@click=${() => this.collapsed = !this.collapsed}
					aria-label="close">${!this.collapsed ? closeSvg : menuSvg}</button>
				<div id="content">
				${!this.collapsed ? html`
					<h2>Examples</h2>
					<div id="loading">${loading ? 'Loading...' : ''}</div>
					${Object.entries(this.examples).map(([group, examples]) => html`
						<h3>${group}</h3>
						<ul>
							${Object.entries(examples).map(([title, link]) => html`
								<li><a href="${link}.html">${title}</a></li>
							`)}
						</ul>
					`)}
				` : html``}
				</div>
			</div>
		`
	}

}

customElements.define('tone-side-panel', ToneSidePanel)
