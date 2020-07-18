import { VisBase } from "./vis-base";
import { customElement } from "lit-element";

@customElement("tone-waveform-vis")
class ToneWaveformElement extends VisBase {
	protected height = 40;
	private tone: import("tone").Waveform;

	protected generate() {
		// ignored
	}

	private loop() {
		requestAnimationFrame(this.loop.bind(this));
		if (!this.tone) {
			return;
		}
		const values = this.tone.getValue();
		this.draw(values);
	}

	bind(tone: import("tone").ToneAudioNode) {
		this.tone = tone as import("tone").Waveform;
		this.loop();
	}
}

interface WaveformOptions {
	parent?: HTMLElement;
	tone: import("tone").Waveform;
	height?: number;
}

/**
 * Create an audio node element
 */
export function createWaveform({
	tone,
	parent,
	height,
}: WaveformOptions): ToneWaveformElement {
	const element = document.createElement(
		"tone-waveform-vis"
	) as ToneWaveformElement;
	element.bind(tone);
	if (parent) {
		parent.appendChild(element);
	}
	if (height) {
		element.setAttribute("height", height.toString());
	}
	return element;
}
