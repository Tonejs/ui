import {
	css,
	html,
	LitElement,
	property,
	unsafeCSS,
	customElement,
} from "lit-element";
import { createElement, ToneAudioNodeElementOptions } from "./audio-node";
const style = require("./folder.scss");
import "@material/mwc-icon";

export interface ToneFolderElementOptions {
	name?: string;
	open?: boolean;
}

/**
 * A collapsible folder inside tone-drawer
 */
@customElement("tone-folder")
export class ToneFolderElement extends LitElement {
	/**
	 * If it is open or collapsed
	 */
	@property({ type: Boolean })
	open = true;

	/**
	 * The name of the folder
	 */
	@property({ type: String })
	name: string;

	static get styles() {
		return css`
			${unsafeCSS(style)}
		`;
	}

	/**
	 * Add a Tone.js ToneAudioNode
	 */
	add({ tone, name }: ToneAudioNodeElementOptions): this {
		const element = createElement({
			tone,
			name,
		});
		this.appendChild(element);
		return this;
	}

	render() {
		return html`
			<div id="container" ?open=${this.open}>
				<details
					?open=${this.open}
					@toggle=${(e) =>
						(this.open = (e.target as HTMLDetailsElement).open)}
				>
					<summary>
						<mwc-icon>
							${this.open
								? "keyboard_arrow_down"
								: "keyboard_arrow_right"}
						</mwc-icon>
						<span>
							${this.name}
						</span>
					</summary>
					<div id="contents">
						<slot></slot>
					</div>
				</details>
			</div>
		`;
	}
}

type ElementOptions = ToneFolderElementOptions & { parent?: HTMLElement };

/**
 * Create a folder with the given name
 */
export function createFolder({
	name,
	parent,
	open = false,
}: ElementOptions): ToneFolderElement {
	const element = document.createElement("tone-folder") as ToneFolderElement;
	element.name = name;
	element.open = open;
	if (parent) {
		parent.appendChild(element);
	}
	return element;
}
