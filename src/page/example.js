import { LitElement, html } from '@polymer/lit-element'
import './side-panel'
import './topbar'

class ToneExample extends LitElement {

	static get properties(){
		return {
			collapsed : { type : Boolean },
			open : { type : Boolean }
		}
	}

	constructor(){
		super()
		this.collapsed = true
	}

	updated(changed){
		if (changed.has('open')){
			this.collapsed = !this.open
		}
	}
	
	render(){
		return html`
			<style>
				:host {
					display: inline-block;
					--top-bar-height: 44px;
				}

				#container {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100%;
				}

				#container[collapsed]{
					--side-panel-width : 0px;
				}

				#container[collapsed] tone-side-panel {
					position: absolute;
				}

				tone-side-panel {
					position: fixed;
					height: 100%;
					top: 0px;
					z-index: 2;
					transition: all var(--side-panel-transition);
					// top: var(--top-bar-height);
					// height: calc(100% - var(--top-bar-height));
				}

				tone-top-bar {
					width: 100%;
					right: 0px;
				}

				#main {
					--margin: 4px;
					transition: width var(--side-panel-transition);
					display: inline-block;
					width: calc(100% - var(--side-panel-width) - var(--margin) * 2);
					right: var(--margin);
					top: var(--margin);
					position: absolute;
				}

				::slotted(tone-drawer){
					width: calc(100% - var(--side-panel-width));
					transition: width var(--side-panel-transition);
					right: 0px;
					left: unset;
				}

				@media only screen and (max-width: 700px) {
					#main {
						width: calc(100% - var(--margin) * 2);
					}
				}
			</style>
			<div id="container" ?collapsed=${this.collapsed}>
				<tone-side-panel
					?collapsed=${this.collapsed}
					@collapse=${e => this.collapsed = e.detail}
					></tone-side-panel>
				<div id="main">
					<tone-top-bar></tone-top-bar>
					<slot></slot>
				</div>
			</div>
		`
	}

}

customElements.define('tone-example', ToneExample)
