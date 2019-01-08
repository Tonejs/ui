import { LitElement, html } from '@polymer/lit-element'

class Multislider extends LitElement {

	static get properties(){
		return {
			label : { type : String },
			length : { type : Number },
			attribute : { type : String }
		}
	}

	constructor(){
		super()
		this.length = 32
		this.value = Array.from(new Float32Array(this.length))
	}

	_scaleArray(a){
		const max = Math.max(1, ...a)
		return a.slice(0, this.length).map(v => Math.clamp(Math.abs(v/max), 0, 1))
	}

	sync(node){
		const nextArray = this._scaleArray(node[this.attribute])
		if (nextArray.toString() !== this.value){
			this.value = this._scaleArray(node[this.attribute])
			this.requestUpdate()
		}
	}

	set(node){
		node[this.attribute] = this.value
	}

	_eventToXY(e){
		const x = e.offsetX / e.target.offsetWidth
		const y = 1 - e.offsetY / e.target.offsetHeight
		return { x, y }
	}

	mousedown(e){
		if (e.buttons){
			const { x, y } = this._eventToXY(e)
			const length = this.value.length
			//get the slider numebr and adjust it's value
			this.value[Math.floor(x * this.length)] = y
			//if the array changed lengths, fill in empty slots
			if (length !== this.value.length){
				for (let i = 0; i < this.value.length; i++){
					if (!this.value[i]){
						this.value[i] = 0
					}
				}
			}
			this.requestUpdate()
			this.dispatchEvent(new CustomEvent('change', {
				detail : this.value,
				composed : true
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

	render(){
		const values = this.value
		return html`
			<style>
				:host {
					display: block;
				}

				#container {
					position: relative;
					width: 100%;
					height: 55px;
					display: block;
					background-color: #eee;
					margin-top: 5px;
				}

				.slider {
					width: calc(100% / ${this.length});
					display: inline-block;
					height: 100%;
					position: relative;
					float: left;
					pointer-events: none;
				}

				.slider .fill {
					color: green;
					width: 100%;
					height: 0%;
					background-color: #777;
					position: absolute;
					bottom: 0px;
				}

				label {
					font-family: var(--label-font-family);
					font-size: var(--label-font-size);
				}
			</style>
			<label>${this.label}</label>
			<div id="container" 
				@mousedown=${this.mousedown}
				@mousemove=${this.mousedown}>
				${values.map(v => html`
					<span class="slider">
						<div class="fill" style="height : ${Math.ceil(v * 100).toString()}%"></div>
					</span>
				`)}
			</div>
		`
	}

}

customElements.define('tone-multislider', Multislider)
