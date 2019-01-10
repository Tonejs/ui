import { LitElement, html } from '@polymer/lit-element'
import '../viz/waveform'

class ToneDemo extends LitElement {

	static get properties(){
		return {
			autoplay : { type : Boolean },
		}
	}

	firstUpdated(){
		super.firstUpdated()
		this.shadowRoot.querySelector('tone-waveform').bind(Tone.Master)
	}
	
	render(){
		return html`
			<style>

				:host, #container, tone-waveform {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0px;
					left: 0px;
				}

				tone-waveform {
					z-index: 0;
				}

				#content {
					position: relative;
					width: 80%;
					min-width: 200px;
					max-width: 400px;
					margin: 40px auto 0px;
					z-index: 1;
				}

				tone-unmute {
					z-index: 10;
				}

				::slotted(tone-trigger), ::slotted(tone-button), ::slotted(tone-play-toggle), ::slotted(tone-slider){
					width: 100%;
					display: block;
					margin-bottom: 10px;
				}

				::slotted(*){
					font-family: var(--title-font-family);
					font-size: var(--title-font-size);
				}

			</style>
			<div id="container">
				<tone-waveform></tone-waveform>
				${this.autoplay ? html`<tone-unmute novolume></tone-unmute>` : html``}
				<div id="content">
					<slot></slot>
				</div>
			</div>
		`
	}

}

customElements.define('tone-demo', ToneDemo)
