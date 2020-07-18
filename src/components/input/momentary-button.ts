import {
	css,
	html,
	LitElement,
	property,
	unsafeCSS,
	customElement,
} from "lit-element";
const style = require("./momentary-button.scss");
import "./button";

@customElement("tone-momentary-button")
export class ToneMomentaryButton extends LitElement {
	@property({ type: Boolean })
	triggered = false;

	static get styles() {
		return css`
			${unsafeCSS(style)}
		`;
	}

	render() {
		return html`
			<tone-button
				?triggered=${this.triggered}
				@down=${() => (this.triggered = true)}
				@up=${() => (this.triggered = false)}
			>
				<div id="ring">
					<div id="circle"></div>
				</div>
			</tone-button>
		`;
	}
}
