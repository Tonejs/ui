import {
	css,
	html,
	LitElement,
	unsafeCSS,
	property,
	customElement,
} from "lit-element";
import { createElement, ToneAudioNodeElementOptions } from "./audio-node";
import {
	createFolder,
	ToneFolderElement,
	ToneFolderElementOptions,
} from "./folder";
const style = require("./drawer.scss");
import "@material/mwc-icon";

/**
 * Collapsible element to add
 */
@customElement("tone-drawer")
export class ToneDrawerElement extends LitElement {
	/**
	 * If the element is collapsed
	 */
	@property({ type: Boolean })
	open = true;

	/**
	 * If the element is not visible on the page
	 */
	@property({ type: Boolean })
	hidden = false;

	firstUpdated(props) {
		super.firstUpdated(props);
		document.body.addEventListener("keypress", (e: KeyboardEvent) => {
			if (e.key === "H") {
				this.hidden = !this.hidden;
			}
		});
	}

	static get styles() {
		return css`
			${unsafeCSS(style)}
		`;
	}

	/**
	 * Add a Tone.js ToneAudioNode
	 */
	add(options: ToneAudioNodeElementOptions): this {
		const element = createElement(options);
		this.appendChild(element);
		return this;
	}

	/**
	 * Create a folder with the given name
	 */
	folder({ name, open }: ToneFolderElementOptions): ToneFolderElement {
		const element = createFolder({ name, open });
		this.appendChild(element);
		return element;
	}

	render() {
		return html`
			<div id="container" ?open=${this.open} ?hidden=${this.hidden}>
				<details
					?open=${this.open}
					@toggle=${(e) =>
						(this.open = (e.target as HTMLDetailsElement).open)}
				>
					<summary>
						<mwc-icon>
							${!this.open ? "unfold_more" : "unfold_less"}
						</mwc-icon>
						${this.open ? "close" : "controls"}
					</summary>
					<div id="scroll">
						<div id="inner-scroll">
							<slot></slot>
						</div>
					</div>
				</details>
			</div>
		`;
	}
}

/**
 * Create a collapsible drawer
 */
export function createDrawer({
	parent = document.body,
	open = false,
}: {
	parent?: HTMLElement;
	open?: boolean;
} = {}): ToneDrawerElement {
	const element = document.createElement("tone-drawer") as ToneDrawerElement;
	if (parent) {
		parent.appendChild(element);
	}
	element.open = open;
	return element;
}
