import { LitElement, html } from '@polymer/lit-element'
import sliderStyle from './slider.scss'

class ToneSlider extends LitElement {

	static get properties(){
		return {
			min : { type : Number },
			max : { type : Number },
			step : { type : Number },
			value : { type : Number },
			default : { type : Number },
			exp : { type : Number },
			anchor : { type : String },
			label : { type : String },
			units : { type : String },
			integer : { type : Boolean },
			attribute : { type : String },
			bare : { type : Boolean },
		}
	}

	constructor(){
		super()
		this.min = 0
		this.max = 100
		this.step = 1
		this.value = 50
		this.exp = 1
		this.anchor = 'left'
		this.integer = false
		this.bare = false
		this._setThrottle = -1
	}

	_logValue(pos){
		const scaledPos = Math.pow(pos, this.exp)
		const scaledMin = Math.pow(1, this.exp)
		const scaledMax = Math.pow(101, this.exp)
		let val = Math.scale(scaledPos, scaledMin, scaledMax, this.min, this.max)
		if (this.integer){
			val = Math.round(val)
		}
		this.value = val
		this.dispatchEvent(new CustomEvent('input', { composed : true, detail : this.value }))
	}

	_exp(val, exp){
		const sign = Math.sign(val)
		return sign * Math.pow(Math.abs(val), exp)
	}

	_logPosition(){
		const pos = Math.scale(this.value, this.min, this.max, Math.pow(1, this.exp), Math.pow(101, this.exp))
		return Math.pow(pos, 1/this.exp)
	}

	_beautifyVal(){
		const diff = Math.abs(this.min - this.max)
		if (diff > 10 || this.integer){
			return this.value.toFixed(0)
		} else if (diff > 1 && this.exp === 1){
			return this.value.toFixed(1)
		} else {
			return this.value.toFixed(2)
		}
	}

	_getStep(){
		const diff = Math.abs(this.min - this.max)
		if (diff > 10 || this.integer){
			return 1
		} else if (diff > 1 && this.exp === 1){
			return 0.1
		} else {
			return 0.01
		}
	}

	sync(tone){
		const attr = this.attribute
		if (typeof tone[attr].value !== 'undefined'){
			this.value = Math.clamp(tone[attr].value, this.min, this.max)
		} else {
			this.value = Math.clamp(tone[attr], this.min, this.max)
		}
	}

	set(tone){
		const attr = this.attribute
		if (isFinite(this.value)){
			if (typeof tone[attr].value !== 'undefined'){
				if (tone[attr].value !== this.value){
					tone[attr].value = this.value
				}
			} else if (tone[attr] !== this.value){
				tone[attr] = this.value
			}
		}
	}

	updated(changed){
		super.updated(changed)
		if (changed.has('value')){
			this.dispatchEvent(new CustomEvent('change', { 
				composed : true, 
				detail : this.value, 
				bubbles : true,
			}))
			if (this.attribute){
				this.dispatchEvent(new CustomEvent(this.attribute, { 
					composed : true, 
					detail : this.value, 
					bubbles : true,
				}))
			}
		}
	}

	_numberInput(e){
		const val = Math.clamp(parseFloat(e.target.value), this.min, this.max)
		if (this.integer){
			this.value = Math.floor(val)
		} else {
			this.value = val
		}
	}

	render(){
		const logPos = Math.clamp(this._logPosition(), 0, 100)
		let fillWidth = logPos-1
		let anchorLeft = 0
		if (this.anchor === 'center'){
			anchorLeft = 50 - Math.max(50 - fillWidth, 0)
			fillWidth = Math.abs(50 - fillWidth)
		}
		return html`
			<style>
				${sliderStyle}
			</style>
			<div id="container" @keydown=${e => e.key === 'Backspace' && typeof this.default !== 'undefined' ? this.value = this.default : '' }>
				<label ?hidden=${this.bare} for="value">${this.label}</label>
				<span ?hidden=${this.bare} id="units">${this.units}</span>
				<input ?hidden=${this.bare} name="value" type="number"
					@change=${this._numberInput.bind(this)}
					.min=${this.min}
					.max=${this.max}
					.step=${this._getStep()}
					.value=${this._beautifyVal()}>
				<div id="slider">
					<input name="value" type="range"
						@input=${e => this._logValue(parseFloat(e.target.value))}
						min="1"
						max="101"
						.step=${Math.pow(this.step, 1/this.exp)}
						@focus=${() => this.shadowRoot.querySelector('#circle').classList.add('focus')}
						@blur=${() => this.shadowRoot.querySelector('#circle').classList.remove('focus')}
						.value=${logPos}>
					<div id="line">
						<div id="anchor" class=${this.anchor} style="width:${fillWidth.toString()}%; left:${anchorLeft.toString()}%"></div>
					</div>
					<div id="circle" style="left: calc(${(logPos-1).toString()}% - ${(12*(logPos-1) / 100).toString()}px);"></div>
				</div>
			</div>
		`
	}

}

customElements.define('tone-slider', ToneSlider)
