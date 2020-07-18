import { css, customElement, html, LitElement, property, query, unsafeCSS } from "lit-element";
const style = require("./slider-pad.scss");

@customElement("tone-slider-pad")
export class ToneSliderPad extends LitElement {

	@property({ type: Number })
	xPosition = 0.5;
	
	@property({ type: Number })
	yPosition = 0.5;

	@property({ type: Boolean })
	pressed = false;

	@query(".square")
	private _container: HTMLDivElement

	@query("#puck")
	private _puck: HTMLDivElement

	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	private _updatePosition(e: MouseEvent) {
		this.xPosition = this._clamp(e.offsetX / this._container.offsetWidth);
		this.yPosition = this._clamp(e.offsetY / this._container.offsetHeight);
		this.dispatchEvent(new CustomEvent("move", { 
			composed: true,
			detail: {
				x: this.xPosition,
				y: this.yPosition,
			}
		}));
	}
	
	updated(changed) {
		if (changed.has("pressed")) {
			this.dispatchEvent(new CustomEvent(this.pressed ? "down" : "up", { 
				composed: true,
				detail: {
					x: this.xPosition,
					y: this.yPosition,
				}
			 }));
		}
	}

	private _mousemove(e: MouseEvent) {
		if (e.buttons) {
			this._updatePosition(e);
		}
	}

	private _mousedown(e: MouseEvent) {
		this._updatePosition(e);
		this.pressed = true;
	}
	
	private _mouseup(e: MouseEvent) {
		this._updatePosition(e);
		this.pressed = false;
	}

	private _clamp(value) {
		return Math.min(Math.max(value, 0), 1);
	}

	private puckStyle(): string {
		const leftPercent = `${(this.xPosition * 100).toFixed(2)}%`;
		const topPercent = `${(this.yPosition * 100).toFixed(2)}%`;
		return `left: ${leftPercent}; top: ${topPercent};`;
	}

	render() {
		return html`
			<div id="container">
				<div class="square" 
					@mousemove=${this._mousemove.bind(this)}
					@mousedown=${this._mousedown.bind(this)}
					@mouseup=${this._mouseup.bind(this)}
					@mouseleave=${() => this.pressed = false}
				>
					<div id="puck" 
						style="${this.puckStyle()}">
					</div>
				</div>
			</div>
		`;
	}
}
