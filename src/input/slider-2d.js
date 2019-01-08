import { LitElement, html } from '@polymer/lit-element'

export class ToneStepSequencer extends LitElement {

	static get properties(){
		return {
			x : { type : Number },
			y : { type : Number }
		}
	}

	constructor(){
		super()
		this.x = 0.5
		this.y = 0.5
	}

	_resize(){
		const container = this.shadowRoot.querySelector('#container')
		this._slider.resize(container.clientWidth, container.clientHeight)
	}

	_getXY(e){
		e.stopPropagation()
		e.preventDefault()
		const { clientWidth, clientHeight } = this.shadowRoot.querySelector('#container')
		let offsetX = e.offsetX
		let offsetY = e.offsetY
		if (e.changedTouches){
			const { top, left } = this.getBoundingClientRect()
			//just use the first touch
			offsetX = e.changedTouches[0].clientX - left
			offsetY = e.changedTouches[0].clientY - top			
		}
		return {
			x : Math.clamp(offsetX / clientWidth, 0, 1),
			y : 1 - Math.clamp(offsetY / clientHeight, 0, 1)
		}
	}

	_mousedown(e){
		const { x, y } = this._getXY(e)
		this.x = x
		this.y = y
		this.dispatchEvent(new CustomEvent('mousedown', { detail : {
			x : this.x, 
			y : this.y
		}, composed : true }))
	}

	_mouseup(e){
		const { x, y } = this._getXY(e)
		this.x = x
		this.y = y
		this.dispatchEvent(new CustomEvent('mouseup', { detail : {
			x : this.x, 
			y : this.y
		}, composed : true }))
	}

	_mousemove(e){
		if (e.buttons || e.changedTouches){
			const { x, y } = this._getXY(e)
			this.x = x
			this.y = y
			this.dispatchEvent(new CustomEvent('change', { detail : {
				x : this.x, 
				y : this.y
			}, composed : true }))
		}
	}

	_mouseleave(e){
		if (e.buttons){
			this._mouseup(e)
		}
	}

	render(){
		return html`
			<style>
				:host {
					display: inline-block;
					width: 100%;
					height: 120px;
				}
				#container {
					width: 100%;
					height: 100%;
					background-color: var(--color-light-gray);
					position: relative;
					overflow: hidden;
				}

				#circle {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 30px;
					height: 30px;
					border-radius: 50%;
					background-color: var(--color-teal);
					pointer-events: none;
				}
			</style>
			<div id="container" 
				@mouseup=${this._mouseup.bind(this)}
				@touchend=${this._mouseup.bind(this)}
				@mousedown=${this._mousedown.bind(this)}
				@touchstart=${this._mousedown.bind(this)}
				@mousemove=${this._mousemove.bind(this)}
				@touchmove=${this._mousemove.bind(this)}
				@mouseleave=${this._mouseleave.bind(this)}>
				<div id="circle" style="left : ${(this.x * 100).toString()}% ; top : ${((1-this.y) * 100).toString()}%">
				</div>
			</div>
		`
	}
}

customElements.define('tone-slider-2d', ToneStepSequencer)
