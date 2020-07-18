import {
	css,
	html,
	LitElement,
	property,
	unsafeCSS,
	customElement,
} from "lit-element";
import "./button";
const style = require("./play-toggle.scss");

@customElement("tone-play-toggle")
export class TonePlayToggle extends LitElement {
	@property({ type: Boolean })
	started = false;

	@property({ type: Boolean })
	disabled = false;

	// updated(changed) {
	// 	if (changed.has("started")) {
	// 		this.dispatchEvent(
	// 			new CustomEvent(this.started ? "start" : "stop")
	// 		);
	// 	}
	// }

	private async _clicked(e: InputEvent) {
		this.started = !this.started;
		e.stopPropagation();
		this.dispatchEvent(
			new CustomEvent(this.started ? "start" : "stop", {
				composed: true,
			})
		);
	}

	static get styles() {
		return css`
			${unsafeCSS(style)}
		`;
	}

	render() {
		return html`
			<tone-button
				?disabled=${this.disabled}
				@click=${!this.disabled ? this._clicked.bind(this) : () => {}}
				title=${this.started ? "Stop" : "Start"}
				aria-label=${this.started ? "Stop" : "Start"}
			>
				<mwc-icon>${!this.started ? "play_arrow" : "stop"}</mwc-icon>
			</tone-button>
		`;
	}
}
