import { css, html, LitElement, customElement, property } from "lit-element";
import "./sidebar";
import "./mute";

@customElement("tone-example")
export class ToneExample extends LitElement {
	@property({ type: String })
	label = "";

	@property({ type: Boolean })
	open = false;

	firstUpdated() {
		document.querySelector("body").style.margin = "0px";
	}

	static get styles() {
		return css`
			:host {
				width: 100%;
				height: 100%;
				font-family: sans-serif;
			}
			#explanation {
				background-color: var(--color-light-purple);
				font-family: sans-serif;
				margin: 20px 0;
			}

			::slotted(a) {
				text-decoration: none;
				color: #7f33ed;
			}

			#container {
				display: flex;
			}

			tone-sidebar,
			#inner-container {
				flex: 1;
				transition: flex 0.1s;
			}

			#inner-container {
				height: 100vh;
				width: 100%;
				overflow-y: auto;
			}

			#body {
				padding: 40px;
				position: relative;
			}

			tone-sidebar {
				flex: 0 0 240px;
				z-index: 1;
			}

			tone-sidebar:not([open]) {
				flex: 0 0 0px;
				width: 0px;
			}

			#content {
				max-width: 600px;
				margin: 0px auto;
			}

			#title {
				font-size: 1.1em;
				color: #616161;
			}
		`;
	}

	render() {
		return html`
			<div id="container">
				<tone-sidebar
					?open=${this.open}
					@open=${(e) => (this.open = e.detail)}
				></tone-sidebar>
				<div id="inner-container">
					<div id="body">
						<tone-mute></tone-mute>
						<div id="title">${this.title}</div>
						<div id="explanation">
							<slot name="explanation"></slot>
						</div>
						<div id="content">
							<slot></slot>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
