import { html, LitElement, property, customElement } from "lit-element";
import * as deepEquals from "deep-equal";
import "./oscillator";
import "./envelope";
import "./filter";
import "./compressor";
import "./meter";
import "./waveform";
import "./buffer";

@customElement("tone-visualizer")
export class ToneVisualizer extends LitElement {
	private tone: import("tone").ToneAudioNode;

	@property({ type: Array })
	private path: string[];

	@property({ type: Object })
	private values: Record<string, any>;

	/**
	 * Make sure that it is rendered for the first time
	 * before applying shouldUpdate optimization
	 */
	private firstRendered = false;

	async bind(tone: import("tone").ToneAudioNode) {
		// find the sub object
		this.tone = tone;
		this.path.forEach((path) => {
			this.tone = tone[path];
		});
		if (this.tone) {
			await this.requestUpdate();
			this.shadowRoot
				.querySelectorAll(".vis")
				.forEach((vis: ToneVisualizer) => {
					vis.bind(this.tone);
				});
			this.firstRendered = true;
		}
	}

	shouldUpdate() {
		if (this.tone && this.firstRendered) {
			return deepEquals(this.values, this.tone.get());
		} else {
			return true;
		}
	}

	private chooseVis() {
		if (this.tone.toString().includes("Envelope")) {
			return html`
				<tone-envelope-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-envelope-vis>
			`;
		} else if (this.tone.toString().includes("Oscillator")) {
			return html`
				<tone-oscillator-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-oscillator-vis>
			`;
		} else if (this.tone.toString() === "Compressor") {
			return html`
				<tone-compressor-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-compressor-vis>
			`;
		} else if (
			this.tone.toString() === "Filter" ||
			this.tone.toString() === "OnePoleFilter"
		) {
			return html`
				<tone-filter-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-filter-vis>
			`;
		} else if (this.tone.toString() === "Meter") {
			return html`
				<tone-meter-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-meter-vis>
			`;
		} else if (this.tone.toString() === "Waveform") {
			return html`
				<tone-waveform-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-waveform-vis>
			`;
		} else if (this.tone.toString() === "FFT") {
			return html`
				<tone-fft-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-fft-vis>
			`;
		} else if (Reflect.has(this.tone, "buffer")) {
			return html`
				<tone-buffer-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-buffer-vis>
			`;
		}
	}

	render() {
		if (this.tone) {
			return html`
				<div id="container">
					${this.chooseVis()}
				</div>
			`;
		}
	}
}
