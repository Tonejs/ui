import { html, customElement, property, query } from "lit-element";
import { ToneValue } from "./value";

@customElement("tone-string")
export class ToneStringValue extends ToneValue<string> {
	@property({ type: String })
	name: string;

	@property({ type: String })
	value: string = "";

	@query("input")
	private inputEl: HTMLInputElement;

	private _oninput(e: Event) {
		e.stopPropagation();
		e.stopImmediatePropagation();
		this.value = this.inputEl.value;
		this.dispatchValue(this.value);
	}

	reset() {
		this.inputEl.value = this.value;
	}

	render() {
		return html`
			<div id="container">
				<label for="string">${this.name}</label>
				<input
					@input=${(e) => e.stopPropagation()}
					@change=${this._oninput.bind(this)}
					name="string"
					type="text"
					.value=${this.value}
				/>
			</div>
		`;
	}
}
