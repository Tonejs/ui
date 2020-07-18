import {
	css,
	html,
	LitElement,
	property,
	unsafeCSS,
	customElement,
} from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import "./button";
const style = require("./mic-button.scss");
// import "@material/mwc-icon";

@customElement("tone-mic-button")
export class ToneMicButton extends LitElement {
	@property({ type: Boolean })
	open = false;

	@property({ type: Boolean })
	supported = false;

	updated(changed) {
		if (changed.has("open")) {
			this.dispatchEvent(new CustomEvent(this.open ? "open" : "close"));
		}
	}

	private async _clicked() {
		this.open = !this.open;
	}

	static get styles() {
		return css`
			${unsafeCSS(style)}
		`;
	}

	render() {
		return html`
			<tone-button
				?disabled=${!this.supported}
				@click=${this._clicked.bind(this)}
				title=${this.open ? "Stop" : "Start"}
				aria-label=${this.open ? "Stop" : "Start"}
			>
				<mwc-icon>
					${!this.open ? "mic" : "mic_off"}
				</mwc-icon>
			</tone-button>
		`;
	}
}
