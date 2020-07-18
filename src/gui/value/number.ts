import { html, customElement, property } from "lit-element";
import { ToneValue } from "./value";

@customElement("tone-number")
export class ToneNumberValue extends ToneValue<number> {
	@property({ type: String })
	name: string;

	@property({ type: Number })
	value: number = 0;

	private alt = false;
	private shift = false;
	private dragging = false;
	private dragstartValue: number;

	firstUpdated(changed) {
		super.firstUpdated(changed);
		window.addEventListener("mousemove", (e: MouseEvent) => {
			if (this.dragging) {
				e.preventDefault();
				// find the relative change
				const box = this.shadowRoot.host.getBoundingClientRect();
				const yDiff = box.top + (box.bottom - box.top) / 2 - e.clientY;
				const multiplier = this.shift
					? this.alt
						? 0.01
						: 10
					: this.alt
					? 0.1
					: 1;
				this.value =
					this.dragstartValue + Math.floor(yDiff / 10) * multiplier;
				this.dispatchValue(this.value);
			}
		});

		window.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.keyCode === 18) {
				this.alt = true;
			}
			this.shift = e.shiftKey;
		});

		window.addEventListener("keyup", (e: KeyboardEvent) => {
			if (e.keyCode === 18) {
				this.alt = false;
			}
			this.shift = e.shiftKey;
		});
	}

	private _oninput(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		const value = parseFloat(this.shadowRoot.querySelector("input").value);
		if (isFinite(value)) {
			this.value = value;
			this.dispatchValue(value);
		}
	}

	private _onkeypress(e: KeyboardEvent) {
		let modified = false;
		if (e.key === "ArrowUp") {
			modified = true;
			if (this.shift) {
				this.value += this.alt ? 0.01 : 10;
			} else {
				this.value += this.alt ? 0.1 : 1;
			}
		} else if (e.key === "ArrowDown") {
			modified = true;
			if (this.shift) {
				this.value -= this.alt ? 0.01 : 10;
			} else {
				this.value -= this.alt ? 0.1 : 1;
			}
		}
		if (modified) {
			e.preventDefault();
			this.dispatchValue(this.value);
		}
	}

	protected reset() {
		this.shadowRoot.querySelector("input").value = this.beautifyValue(
			this.value
		).toString();
	}

	private _dragstart(e: MouseEvent) {
		this.dragging = true;
		this.dragstartValue = this.value;
		window.addEventListener(
			"mouseup",
			() => {
				if (this.dragstartValue !== this.value) {
					this.dispatchValue(this.value);
				}
				this.dragging = false;
			},
			{ once: true }
		);
	}

	protected beautifyValue(val: number): number {
		const float = val.toString().split(".")[1];
		return parseFloat(val.toFixed(Math.min(float && float.length, 4)));
	}

	render() {
		return html`
			<div id="container">
				<label for="number">${this.name}</label>
				<input
					@mousedown=${this._dragstart.bind(this)}
					@keydown=${this._onkeypress.bind(this)}
					@change=${this._oninput.bind(this)}
					name="number"
					type="text"
					.value="${this.beautifyValue(this.value)}"
				/>
			</div>
		`;
	}
}
