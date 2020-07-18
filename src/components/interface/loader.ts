import { loaded, ToneAudioBuffer } from "tone";
import { css, html, LitElement, property, unsafeCSS } from "lit-element";

export class ToneLoader extends LitElement {
	@property({ type: Boolean })
	loading = false;

	@property({ type: Number })
	dots = 0;

	static get styles() {
		return css`
			#container {
				position: fixed;
				width: 100%;
				height: 100%;
				background-color: rgba(55, 55, 55, 0.5);
				z-index: 10000000;
				top: 0px;
				left: 0px;
				right: 0px;
				bottom: 0px;
				pointer-events: none;
				transition: opacity 0.2s;
				opacity: 0;
			}
			#container[loading] {
				opacity: 1;
			}

			#text {
				position: absolute;
				top: 50%;
				left: 50%;
				font-family: $titleFont;
				color: white;
				font-size: 2em;
				width: 100px;
				transform: translate(-50%, -50%);
			}
		`;
	}

	firstUpdated(props) {
		super.firstUpdated(props);
		window.onload = () => {
			this.loading = ToneAudioBuffer.downloads.length > 0;
			if (this.loading) {
				loaded().then(() => {
					this.loading = false;
				});
				this._dotLoop();
			}
		};
	}

	private _dotLoop() {
		if (this.loading) {
			this.dots = (this.dots + 1) % 4;
			setTimeout(() => {
				this._dotLoop();
			}, 500);
		}
	}

	render() {
		let dots = "";
		for (let i = 0; i < this.dots; i++) {
			dots += ".";
		}
		return html`
			<div id="container" ?loading=${this.loading}>
				<div id="text">loading${dots}</div>
			</div>
		`;
	}
}
customElements.define("tone-loader", ToneLoader);
