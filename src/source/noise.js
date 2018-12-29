import { LitElement, html } from '@polymer/lit-element'
import '../rack/rack'
import '../input/slider'
import { ToneBinded } from '../rack/binded'

class ToneNosie extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
		}
	}

	constructor(){
		super()
		this.label = 'Noise'
	}
	
	render(){
		return html`
			<style>
				:host {
					display: block;
				}

				tone-slider, tone-select-attribute {
					display: block;
					margin-top: 10px;
				}

			</style>
			<tone-rack label="${this.label}" ?collapsed=${this.collapsed}>
				<tone-select-attribute
					attribute="type"
					label="Type">
					<option value="white">white</option>
					<option value="brown">brown</option>
					<option value="pink">pink</option>
				</tone-select-attribute>
				<tone-slider 
					min="0.1"
					max="4"
					exp="2"
					value="1"
					label="Playback Rate"
					attribute="playbackRate">
				</tone-slider>
			</tone-rack>
		`
	}

}

customElements.define('tone-noise', ToneNosie)
