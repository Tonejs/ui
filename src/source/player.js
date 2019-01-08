import { LitElement, html } from '@polymer/lit-element'
import '../rack/rack'
import '../input/toggle'
import '../input/play-toggle'
import './player-viz'
import { ToneBinded } from '../rack/binded'

class TonePlayer extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
			duration : { type : Number },
		}
	}

	constructor(){
		super()
		this.label = 'Player'
		this.duration = 0
	}

	bind(tone){
		const interval = setInterval(() => {
			if (tone.loaded){
				clearInterval(interval)
				this.duration = tone.buffer.duration
				this.sync(tone)
			}
		}, 100)
		super.bind(tone)
	}
	
	render(){
		return html`
			<style>
				:host {
					display: block;
				}

				tone-slider, tone-toggle {
					display: block;
					margin-top: 10px;
				}

				tone-player-viz#top {
					position: absolute;
					top: 9px;
					right: 15px;
				}

				tone-rack:not([collapsed]) tone-player-viz#top{
					display: none;
				}

				tone-player-viz#bottom {
					position: relative;
					display: block;
					width: calc(100% - 20px);
					height: 60px;
					background-color: black;
					border-radius: 10px;
					padding: 10px;
					margin-top: 20px;
				}

				tone-play-toggle {
					position: absolute;
					top: 5px;
					left: 50%;
					transform: translate(-50%, 0);
				}

			</style>
			<tone-rack 
				@collapse=${e => this.collapsed = e.detail}
				?collapsed=${this.collapsed} label="${this.label}">
				<tone-player-viz slot="top" class="viz" id="top" color="black"></tone-player-viz>
				<tone-player-viz class="viz" id="bottom" color="white"></tone-player-viz>
				<tone-slider 
					min="0.5"
					max="2"
					exp="2"
					value="1"
					label="Playback Rate"
					attribute="playbackRate">
				</tone-slider>
				<tone-toggle 
					label="Loop"
					attribute="loop">
				</tone-toggle>
				<tone-slider 
					min="0"
					value="0"
					label="Loop Start"
					.max=${this.duration}
					attribute="loopStart">
				</tone-slider>
				<tone-slider 
					min="0"
					value="0"
					label="Loop End"
					.max=${this.duration}
					attribute="loopEnd">
				</tone-slider>
				<tone-toggle 
					label="Reverse"
					attribute="reverse">
				</tone-toggle>
			</tone-rack>
		`
	}

}

customElements.define('tone-player', TonePlayer)
