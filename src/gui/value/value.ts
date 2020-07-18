import { css, html, LitElement, unsafeCSS, property } from "lit-element";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const style = require("./value.scss");

/**
 * Base class for values
 */
export abstract class ToneValue<T> extends LitElement {
	@property({ type: String })
	name: string;

	abstract value: T;

	/**
	 * Beautify the value before it's set
	 */
	protected beautifyValue(val: T): T {
		return val;
	}

	/**
	 * Reset the value to what it was. this is called
	 * when there is an input error thrown, so that the UI can
	 * correct back to what it was.
	 */
	protected abstract reset();

	/**
	 * Trigger a "value" event. Value events have a rejected callback
	 * in case the value is not valid
	 */
	protected dispatchValue(value: T) {
		this.dispatchEvent(
			new CustomEvent("value", {
				detail: {
					value,
					reject: (val: T) => {
						this.value = val;
						// flash red quickly?
						this.shadowRoot
							.querySelector("#container")
							.classList.add("error");
						setTimeout(() => {
							this.shadowRoot
								.querySelector("#container")
								.classList.remove("error");
						}, 100);
						this.reset();
					},
				},
			})
		);
	}

	static get styles() {
		return css`
			${unsafeCSS(style)}
		`;
	}

	render() {
		return html` ${this.name} `;
	}
}
