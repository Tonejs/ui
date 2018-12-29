import { LitElement, html } from '@polymer/lit-element'

class ToneContent extends LitElement {
	
	render(){
		return html`
			<style>

				:host {
					display: block;
					width: 100%;
				}
				#content {
					width: 80%;
					min-width: 320px;
					max-width: 600px;
					margin: 40px auto 60px;
				}

			</style>
			<div id="content">
				<slot></slot>
			</div>
		`
	}

}

customElements.define('tone-content', ToneContent)
