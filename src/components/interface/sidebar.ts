import { css, html, LitElement, property, customElement } from "lit-element";
import { version } from "tone";

@customElement("tone-sidebar")
export class ToneSidebar extends LitElement {
	@property({ type: Boolean })
	open = false;

	@property({ type: Boolean })
	loading = true;

	private examples: Object = {};

	async firstUpdated() {
		const response = await fetch("./js/ExampleList.json");
		if (response.ok) {
			this.examples = await response.json();
			this.loading = false;
		}
	}

	updated(changed) {
		if (changed.has("open")) {
			this.dispatchEvent(
				new CustomEvent("open", {
					detail: this.open,
				})
			);
		}
	}

	static get styles() {
		return css`
			:host {
				position: relative;
				height: 100%;
				width: 100%;
			}
			#title a {
				font-size: 1.2em;
				text-decoration: none;
				color: black;
				font-family: sans-serif;
			}
			#title {
				margin: 10px 15px;
			}
			#content {
				overflow: hidden;
				width: 100%;
				height: 100vh;
				overflow-y: scroll;
				background-color: var(--light-gray, #ececec);
			}
			#content:not([open]) {
				width: 0px;
			}

			#expand {
				position: absolute;
				top: 0px;
				right: -35px;
				appearance: none;
				background-color: transparent;
				border: none;
			}

			ul,
			li {
				padding: 5px 10px;
				text-align: left;
				list-style-type: none;
				font-family: sans-serif;
				width: 100%;
			}
			ul:last-child {
				padding-bottom: 20px;
			}
			ul span {
				text-transform: uppercase;
				border-bottom: 1px solid #616161;
				margin-bottom: 10px;
				width: 100%;
				display: block;
				color: #616161;
			}

			li a {
				text-decoration: none;
				color: black;
				width: 100%;
				display: block;
			}

			li[selected] {
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
				background-color: white;
			}
		`;
	}

	render() {
		const splitPath = window.location.pathname.split("/");
		const exampleName = splitPath[splitPath.length - 1];
		return html`
			<div id="content" ?open=${this.open}>
				<div id="title">
					<a href="https://tonejs.github.io">Tone.js v${version}</a>
				</div>
				${this.loading
					? "loading"
					: Object.keys(this.examples).map(
							(group) => html`
								<ul id="group">
									<span>${group}</span>
									${Object.keys(this.examples[group]).map(
										(subgroup) => html`
											<li
												?selected=${exampleName ===
												this.examples[group][subgroup]}
											>
												<a
													href=${this.examples[group][
														subgroup
													]}
												>
													${subgroup}
												</a>
											</li>
										`
									)}
								</ul>
							`
					  )}
			</div>
			<button id="expand" @click=${() => (this.open = !this.open)}>
				<mwc-icon>${!this.open ? "menu" : "menu_open"}</mwc-icon>
			</button>
		`;
	}
}
