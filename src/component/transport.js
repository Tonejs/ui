import { LitElement, html } from '@polymer/lit-element'
import '../input/slider'
import { ToneBinded } from '../rack/binded'

export class ToneTransport extends ToneBinded {

	static get properties(){
		return {
			controls : { type : Boolean },
			position : { type : Boolean }
		}
	}

	constructor(){
		super()
		this.collapsed = true
	}

	bind(tone){
		super.bind(tone)
		this.shadowRoot.querySelector('tone-play-toggle').bind(tone)
		setInterval(() => {
			this.shadowRoot.querySelector('#position').textContent = tone.position
		}, 100)
	}

	render(){
		
		return html`
			<style>
				:host {
					display: block;
				}
				#container {
					background-color: var(--color-light-gray);
					padding: 5px;
				}
				tone-play-toggle {
					width: 50%;
				}
				#top {
					position: relative;
				}
				#top tone-play-toggle {
					width: 60%;
				}
				#top #position {
					background-color: white;
					padding: 5px;
					position: absolute;
					width: 30%;
					right: 8px;
					transform: translate(0%, -50%);
					text-align: center;
					top: 50%;
					font-family: monospace;
				}
				tone-rack {
					margin-top: 10px;
				}

				tone-slider, tone-toggle {
					display: block;
					margin-top: 10px;
				}
				tone-slider {
					width: 80%;
					margin: 10px auto 0;
				}
				#tempo {
					width: calc(100% - 10px);
				}
			</style>
			<div id="container">
				<div id="top">
					<tone-play-toggle></tone-play-toggle>
					<div id="position">0:0:0</div>
				</div>
				<tone-slider
					id="tempo"
					min="60"
					max="240"
					label="Tempo"
					exp="2"
					units="bpm"
					attribute="bpm">
				</tone-slider>
				${this.controls ? html`
					<tone-rack square label="Transport Settings" ?collapsed=${this.collapsed}>
						<tone-toggle
							label="Loop"
							attribute="loop">
						</tone-toggle>
						<tone-slider
							min="0"
							max="10"
							label="Loop Start"
							attribute="loopStart">
						</tone-slider>
						<tone-slider
							min="0"
							max="10"
							label="Loop End"
							attribute="loopEnd">
						</tone-slider>
					</tone-rack>
				` : html``}
			</div>
		`
	}

}

customElements.define('tone-transport', ToneTransport)
