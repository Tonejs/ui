import {
	css,
	html,
	LitElement,
	property,
	unsafeCSS,
	customElement,
} from "lit-element";
import { Midi } from "tone";

@customElement("tone-keyboard-note")
export class ToneKeyboardNote extends LitElement {
	@property({ type: Number })
	note: number;

	@property({ type: String })
	color = "#eee";

	@property({ type: String })
	activecolor = "white";

	@property({ type: Boolean })
	active = false;

	@property({ type: Number })
	velocity: number;

	@property({ type: Number })
	touchid = -1;

	private _fromMidi(midi: number): string {
		return Midi(midi).toNote();
	}

	updated(changed) {
		if (changed.has("active") && changed.get("active") !== undefined) {
			const eventName = this.active ? "noteon" : "noteoff";
			if (!this.active) {
				this.touchid = -1;
			}
			this.dispatchEvent(
				new CustomEvent(eventName, {
					detail: {
						name: this._fromMidi(this.note),
						midi: this.note,
						velocity: this.active ? 1 : 0,
					},
					composed: true,
					bubbles: true,
				})
			);
		}
	}

	private _mouseover(e: MouseEvent) {
		if (e.buttons) {
			this.active = true;
			this.shadowRoot.querySelector("button").focus();
		}
	}

	private _keydown(e: KeyboardEvent) {
		if (!e.repeat && (e.key === " " || e.key === "Enter")) {
			this.active = true;
		}
	}

	private _keyup(e: KeyboardEvent) {
		if (e.key === " " || e.key === "Enter") {
			this.active = false;
		}
	}

	private _touchstart(e: TouchEvent) {
		e.preventDefault();
		this.touchid = e.touches[0].identifier;
		this.active = true;
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}

			#container {
				width: 100%;
				height: 100%;
				display: block;
			}
			#container:not([show]) {
				opacity: 0;
				margin: 2px;
				pointer-events: none;
			}

			button {
				border: none;
				-webkit-appearance: none;
				--key-margin: 2px;
				width: 100%;
				height: 100%;
				border: 2px solid white;
				box-sizing: border-box;
				padding: 0;
				outline: none;
				transition: background-color 0.2s;
				color: transparent;
				font-size: 0px;
				border-radius: 2px;
			}
			button[active] {
				background-color: #666 !important;
				transition-duration: 0s;
			}
			button:focus {
				border-color: #666;
			}
		`;
	}

	render() {
		const show = this.note !== 0;
		return html`
			<div id="container" ?show=${show}>
				${show
					? html` <button
							?active=${this.active}
							@mouseover=${this._mouseover.bind(this)}
							@mouseleave=${() => (this.active = false)}
							@mousedown=${() => (this.active = true)}
							@touchstart=${this._touchstart.bind(this)}
							@touchend=${() => (this.active = false)}
							@mouseup=${() => (this.active = false)}
							@keydown=${this._keydown.bind(this)}
							@keyup=${this._keyup.bind(this)}
							style="background-color: ${this.active
								? this.activecolor
								: this.color};"
					  >
							${this._fromMidi(this.note).replace("#", "♯")}
					  </button>`
					: html``}
			</div>
		`;
	}
}
