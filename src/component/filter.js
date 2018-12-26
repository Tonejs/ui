import { LitElement, html } from '@polymer/lit-element'
import '../rack/rack'
import './filter-viz'
import '../input/select-attribute'
import { ToneBinded } from '../rack/binded'

class ToneFilter extends ToneBinded {

	static get properties(){
		return {
			label : { type : String },
			frequency : { type : Boolean }
		}
	}

	constructor(){
		super()
		this.label = 'Filter'
	}
	
	render(){
		return html`
			<style>
				#top.viz {
					position: absolute;
					top: 9px;
					right: 20px;
					width: 50px;
				}
				tone-rack:not([collapsed]) #top.viz{
					display: none;
				}
				#bottom.viz {
					position: relative;
					display: block;
					width: calc(100% - 20px);
					height: 60px;
					background-color: black;
					border-radius: 10px;
					padding: 10px;
					margin-top: 20px;
				}
				tone-slider {
					display: block;
					margin-top: 10px;
				}
				tone-select-attribute {
					display: block;
					margin-top: 5px;
				}
			</style>
			<tone-rack 
				@collapse=${e => this.collapsed = e.detail}
				?collapsed=${this.collapsed} label="${this.label}">
				<tone-filter-viz class="viz" slot="top" id="top"></tone-filter-viz>
				<tone-filter-viz class="viz" id="bottom" color="white"></tone-filter-viz>
				<tone-select-attribute 
					label="Type"
					attribute="type">
						<tone-option value="lowpass">lowpass</tone-option>
						<tone-option value="highpass">highpass</tone-option>
						<tone-option value="bandpass">bandpass</tone-option>
						<tone-option value="lowshelf">lowshelf</tone-option>
						<tone-option value="highshelf">highshelf</tone-option>
						<tone-option value="peaking">peaking</tone-option>
						<tone-option value="notch">notch</tone-option>
						<tone-option value="allpass">allpass</tone-option>
				</tone-select-attribute>
				<tone-select-attribute 
					label="Rolloff"
					attribute="rolloff">
					<tone-option value="-12">-12</tone-option>
					<tone-option value="-24">-24</tone-option>
					<tone-option value="-48">-48</tone-option>
					<tone-option value="-96">-96</tone-option>
				</tone-select-attribute>
				${this.frequency ? html`
					<tone-slider attribute="frequency"
						value="5000"
						min="20"
						max="20000"
						exp="2"
						units="hz"
						label="Frequency"
						></tone-slider>
				` : html``}
				<tone-slider attribute="Q"
					value="1"
					min="0"
					max="10"
					label="Q"
					></tone-slider>
				<tone-slider attribute="gain"
					value="0"
					min="-20"
					max="3"
					units="dB"
					label="Gain"
					></tone-slider>
			</tone-rack>
		`
	}

}

customElements.define('tone-filter', ToneFilter)
