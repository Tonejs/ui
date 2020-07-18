import { css, html, LitElement, property, unsafeCSS } from "lit-element";
import { startContext } from "../util/start";
const style = require("./button.scss");

export class ToneButton extends LitElement {
	@property({ type: Boolean })
	pressed = false;

	@property({ type: Boolean })
	disabled = false;

	updated(changed) {
		if (changed.has("pressed")) {
			this.dispatchEvent(
				new CustomEvent(this.pressed ? "down" : "up", {
					composed: true,
				})
			);
		}
	}

	static get styles() {
		return css`
			${unsafeCSS(style)}
		`;
	}

	private _mousedown(e: MouseEvent) {
		startContext();
		if (e.type === "touchstart") {
			e.preventDefault();
		}
		this.pressed = true;
	}

	private _keydown(e: KeyboardEvent) {
		startContext();
		if (e.key === " " || e.key === "Enter") {
			this.pressed = true;
		}
	}

	private _keyup(e: KeyboardEvent) {
		if (e.key === " " || e.key === "Enter") {
			this.pressed = false;
		}
	}

	render() {
		return html`
			<button
				?disabled=${this.disabled}
				?pressed=${this.pressed}
				@keydown=${this._keydown.bind(this)}
				@keyup=${this._keyup.bind(this)}
				@mousedown=${this._mousedown.bind(this)}
				@touchstart=${this._mousedown.bind(this)}
				@mouseup=${() => (this.pressed = false)}
				@touchend=${() => (this.pressed = false)}
				aria-label="Trigger"
				.aria-checked=${this.pressed}
			>
				<slot></slot>
			</button>
		`;
	}
}
customElements.define("tone-button", ToneButton);
