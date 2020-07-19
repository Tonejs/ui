import { css, html, LitElement, property, customElement } from "lit-element";
import { startContext } from "../util/start";
import { context, getDestination } from "tone";
import { classMap } from "lit-html/directives/class-map";
// import { html } from "lit-html";
// import "@material/mwc-icon";

@customElement("tone-mute")
export class ToneMuteButton extends LitElement {
	@property({ type: Boolean })
	muted = false;

	@property({ type: Boolean })
	suspended = true;

	static get styles() {
		return css`
			:host {
				position: absolute;
				top: 5px;
				right: 5px;
			}

			button {
				--webkit-appearance: none;
				appearance: none;
				border: none;
				background-color: transparent;
			}
			mwc-icon {
				cursor: pointer;
				color: black;
				z-index: 100000;
			}
			mwc-icon.muted {
				color: #ff4800;
			}
		`;
	}

	firstUpdated(props) {
		super.firstUpdated(props);
		setInterval(() => {
			this.suspended = context.state === "suspended";
		}, 100);
	}

	updated(changed) {
		if (changed.has("muted")) {
			getDestination().mute = this.muted;
		}
	}

	private async _clicked() {
		if (this.suspended) {
			await startContext();
		} else {
			this.muted = !this.muted;
		}
	}

	render() {
		return html`
			<button aria-label="mute" @click=${this._clicked}>
				<mwc-icon
					class=${classMap({
						muted: this.muted || this.suspended,
					})}
				>
					${this.muted || this.suspended ? "volume_off" : "volume_up"}
				</mwc-icon>
			</button>
		`;
	}
}
