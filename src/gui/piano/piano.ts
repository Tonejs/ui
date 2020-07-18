import { html, LitElement, property, customElement } from "lit-element";
import "./keyboard";
import { ToneKeyboard } from "./keyboard";
import "./midi-in";

@customElement("tone-piano")
export class TonePiano extends LitElement {
	@property({ type: Boolean })
	polyphonic = false;

	firstUpdated(props) {
		super.firstUpdated(props);
		const keyboard = this.shadowRoot.querySelector(
			"tone-keyboard"
		) as ToneKeyboard;
		// this.shadowRoot.querySelector("tone-midi-in").addEventListener("noteon", e => {
		// 	e.stopPropagation();
		// 	keyboard.noteon(e.detail.midi);
		// });
		// this.shadowRoot.querySelector("tone-midi-in").addEventListener("noteoff", e => {
		// 	e.stopPropagation();
		// 	keyboard.noteoff(e.detail.midi);
		// });

		window.addEventListener("resize", this._resize.bind(this));
		setTimeout(() => this._resize(), 100);
	}

	private _clamp(v, floor, ceil) {
		return Math.max(Math.min(v, ceil), floor);
	}

	private _scale(v, inMin, inMax, outMin, outMax) {
		return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
	}

	private _resize() {
		const width = this.shadowRoot.querySelector("#container").clientWidth;
		const octaves = this._clamp(Math.floor(width / 100) - 1, 1, 8);
		const rootNote = Math.ceil(this._scale(octaves, 1, 8, 5, 1));
		(this.shadowRoot.querySelector(
			"tone-keyboard"
		) as ToneKeyboard).rootoctave = rootNote;
		(this.shadowRoot.querySelector(
			"tone-keyboard"
		) as ToneKeyboard).octaves = octaves;
	}

	render() {
		return html`
			<style>
				:host {
					display: block;
				}

				#container {
					background-color: var(--color-light-gray);
					position: relative;
					padding: 5px;
					display: block;
				}

				tone-keyboard {
					display: block;
					clear: both;
				}

				tone-midi-in {
					position: relative;
					top: 5px;
					right: 5px;
					display: inline-block;
					float: right;
				}
			</style>
			<div id="container">
				<tone-midi-in> </tone-midi-in>
				<tone-keyboard ?polyphonic=${this.polyphonic}></tone-keyboard>
			</div>
		`;
	}
}

interface NoteEvent {
	name: string;
	midi: number;
	velocity: number;
}
interface ElementOptions {
	name?: string;
	parent?: HTMLElement;
	polyphonic?: boolean;
	noteon?: (e: NoteEvent) => void;
	noteoff?: (e: NoteEvent) => void;
}

/**
 * Create an audio node element
 */
export function createPiano({
	parent,
	polyphonic = true,
	noteon = () => {},
	noteoff = () => {},
}: ElementOptions): TonePiano {
	const element = document.createElement("tone-piano") as TonePiano;
	element.polyphonic = polyphonic;

	element.addEventListener("noteon", (e: CustomEvent) => noteon(e.detail));
	element.addEventListener("noteoff", (e: CustomEvent) => noteoff(e.detail));
	if (parent) {
		parent.appendChild(element);
	}
	return element;
}
