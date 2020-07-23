// import * as monaco from "monaco-editor";
import { property, customElement, LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

@customElement("tone-code-progress")
export class ToneCodeProgress extends LitElement {
	@property({ type: Boolean })
	running = false;

	@property({ type: Number })
	duration = 30;

	static get styles() {
		return css`
			:host {
				display: block;
				position: relative;
			}
			#container {
				width: 100%;
				height: 4px;
				background-color: white;
			}
			#container.running #fill {
				width: 100%;
				transition: width 30s linear;
			}

			#fill {
				width: 100%;
				height: 100%;
				background-color: blue;
				width: 0%;
				transition-duration: 0.2s;
			}
		`;
	}

	render() {
		return html`
			<div
				id="container"
				class=${classMap({
					running: this.running,
				})}
			>
				<div id="fill"></div>
			</div>
		`;
	}
}
