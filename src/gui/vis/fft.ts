import { VisBase } from "./vis-base";
import { customElement } from "lit-element";

@customElement("tone-fft-vis")
class ToneFFTElement extends VisBase {
	protected height = 40;
	private tone: import("tone").FFT;

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
		this.tone = tone as import("tone").FFT;
		this.loop();
	}
}

interface FFTOptions {
	parent?: HTMLElement;
	tone: import("tone").FFT;
	height?: number;
}

/**
 * Create an audio node element
 */
export function createFFT({
	tone,
	parent,
	height,
}: FFTOptions): ToneFFTElement {
	const element = document.createElement("tone-fft-vis") as ToneFFTElement;
	element.bind(tone);
	if (parent) {
		parent.appendChild(element);
	}
	if (height) {
		element.setAttribute("height", height.toString());
	}
	return element;
}
