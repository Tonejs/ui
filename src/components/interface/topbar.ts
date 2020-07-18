import { css, html, LitElement, customElement } from "lit-element";
import { context, Destination } from "tone";
// import "@material/mwc-icon";

@customElement("tone-top-bar")
export class ToneTopBar extends LitElement {
	static get styles() {
		return css`
			:host {
				width: 100%;
				background-color: #ececec;
				height: 30px;
				display: block;
			}

			#title {
				padding-left: 60px;
				color: white;
				height: 100%;
			}
		`;
	}
	render() {
		return html` <div id="title">Tone.js</div> `;
	}
}
