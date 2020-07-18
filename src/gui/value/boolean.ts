import { html, customElement, query, property } from "lit-element";
import { ToneValue } from "./value";

@customElement("tone-boolean")
export class ToneBooleanValue extends ToneValue<boolean> {
	@query("input")
	private inputEl: HTMLInputElement;

	@property({ type: String })
	name: string;

	@property({ type: Boolean })
	value: boolean = false;

	private _oninput(e: Event) {
		e.stopPropagation();
		this.value = this.inputEl.checked;
		this.dispatchValue(this.value);
	}

	reset() {
		this.inputEl.checked = this.value;
	}

	render() {
		return html`
			<div id="container" class="boolean">
				<label for="check">${this.name}</label>
				<input
					@input=${this._oninput.bind(this)}
					name="check"
					type="checkbox"
					?checked=${this.value}
				/>
			</div>
		`;
	}
}
