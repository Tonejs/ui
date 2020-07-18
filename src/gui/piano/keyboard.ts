import {
	css,
	html,
	LitElement,
	property,
	unsafeCSS,
	customElement,
} from "lit-element";
import * as AudioKeys from "audiokeys";
import "./octave";
import { ToneKeyboardOctave } from "./octave";
import "./note";
import { ToneKeyboardNote } from "./note";

@customElement("tone-keyboard")
export class ToneKeyboard extends LitElement {
	@property({ type: Number })
	rootoctave = 4;

	@property({ type: Number })
	octaves = 4;

	@property({ type: Boolean })
	polyphonic = false;

	private _computerKeyboard: AudioKeys;

	constructor() {
		super();
		this._computerKeyboard = new AudioKeys({ polyphony: Infinity });
		this._computerKeyboard.down((e) => {
			this.noteon(e.note);
		});
		this._computerKeyboard.up((e) => {
			this.noteoff(e.note);
		});
	}

	getNoteByTouchId(id): ToneKeyboardNote | undefined {
		const octaves = Array.from(
			this.shadowRoot.querySelectorAll("tone-keyboard-octave")
		) as ToneKeyboardOctave[];
		const octave = octaves.find((o) => o.getNoteByTouchId(id));
		if (octave) {
			return octave.getNoteByTouchId(id);
		}
	}

	private _touchmove(event: TouchEvent) {
		Array.from(event.changedTouches).forEach((e) => {
			this.getNoteByTouchId(e.identifier);
			const activeNote = this.getNoteByTouchId(e.identifier);
			const element = this.shadowRoot.elementFromPoint(
				e.clientX,
				e.clientY
			);
			if (element && element.shadowRoot) {
				const note = element.shadowRoot.elementFromPoint(
					e.clientX,
					e.clientY
				) as ToneKeyboardNote | undefined;
				if (note && note.note && activeNote.note !== note.note) {
					activeNote.active = false;
					activeNote.touchid = -1;
					note.active = true;
					note.touchid = e.identifier;
				}
			}
		});
	}

	private _touchend(event: TouchEvent) {
		Array.from(event.changedTouches).forEach((e) => {
			this.getNoteByTouchId(e.identifier);
			const activeNote = this.getNoteByTouchId(e.identifier);
			if (activeNote && activeNote.active) {
				activeNote.active = false;
				activeNote.touchid = -1;
			}
		});
	}

	noteon(midi) {
		const octaveNumber = Math.floor(midi / 12);
		const toneOctave = this.shadowRoot.querySelector(
			`tone-keyboard-octave[octave="${octaveNumber}"]`
		) as ToneKeyboardOctave;
		if (toneOctave) {
			toneOctave.noteon(midi);
		}
	}

	noteoff(midi) {
		const octaveNumber = Math.floor(midi / 12);
		const toneOctave = this.shadowRoot.querySelector(
			`tone-keyboard-octave[octave="${octaveNumber}"]`
		) as ToneKeyboardOctave;
		if (toneOctave) {
			toneOctave.noteoff(midi);
		}
	}

	render() {
		const octaves = [];
		for (let i = this.rootoctave; i < this.rootoctave + this.octaves; i++) {
			octaves.push(i);
		}
		return html`
			<style>
				#container {
					display: flex;
					background-color: white;
					height: 80px;
				}

				tone-keyboard-octave {
					flex-grow: 1;
				}
			</style>
			<div
				id="container"
				@touchmove=${this._touchmove.bind(this)}
				@touchend=${this._touchend.bind(this)}
			>
				${octaves.map(
					(o) => html`
						<tone-keyboard-octave
							octave=${o.toString()}
						></tone-keyboard-octave>
					`
				)}
			</div>
		`;
	}
}
