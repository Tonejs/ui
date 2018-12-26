import { html } from '@polymer/lit-element'
import { Oscillator } from './oscillator'
import './oscillator-viz'
import { PulseOscillator } from './pulse-oscillator'
import { ModOscillator } from './mod-oscillator'
import { PWMOscillator } from './pwm-oscillator'
import { FatOscillator } from './fat-oscillator'

export class OmniOscillator extends Oscillator {

	static get properties(){
		return {
			label : { type : String },
			sourceType : { type : String },
		}
	}

	constructor(){
		super()
		this.tone = null
		this.label = 'OmniOscillator'
		this.sourceType = 'oscillator'
		this._types = {
			oscillator : new Oscillator(),
			pulse : new PulseOscillator(),
			fm : new ModOscillator(),
			am : new ModOscillator(),
			pwm : new PWMOscillator(),
			fat : new FatOscillator(),
		}
		this._types.fm.modIndex = true
	}

	setAttribute(attr, source, tone){
		if (attr === 'type'){
			if (this.sourceType === 'oscillator'){
				tone.type = source.value
			} else if (this.sourceType === 'am' || this.sourceType === 'fat' || this.sourceType === 'fm'){
				tone.type = `${this.sourceType}${source.value}`
			} else {
				tone.type = source.value
			}
		} else {
			source.set(tone)
		}
	}

	bind(tone){
		this.tone = tone
		super.bind(tone)
	}

	updated(changed){
		if (changed.has('sourceType') && this.tone){
			if (this.tone.sourceType !== this.sourceType){
				this.tone.sourceType = this.sourceType
			}
			//select the select
			this.shadowRoot.querySelector('#sourceType').value = this.sourceType
			this.sync(this.tone)
		}
	}

	sync(tone){
		this.sourceType = tone.sourceType
		super.sync(tone)
	}

	renderAttributes(){
		return html`
			<style>
				#sourceType {
					position: absolute;
					top: 8px;
					right: 80px;
				}

				#attributeContainer {
					margin-top: 20px;
				}
			</style>
			<tone-select slot="top" 
				id="sourceType"
				@change=${e => this.sourceType = e.detail}>
				<tone-option value="oscillator">basic</tone-option>
				<tone-option value="fm">fm</tone-option>
				<tone-option value="am">am</tone-option>
				<tone-option value="fat">fat</tone-option>
				<tone-option value="pulse">pulse</tone-option>
				<tone-option value="pwm">pwm</tone-option>
			</tone-select>
			<div id="attributeContainer">
				${this._types[this.sourceType].renderAttributes()}
			</div>
		`
	}
}

customElements.define('tone-omni-oscillator', OmniOscillator)
