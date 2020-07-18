import { VisBase } from "./vis-base";
import { customElement } from "lit-element";

@customElement("tone-filter-vis")
export class ToneFFTVis extends VisBase {
	private tone: import("tone").Filter;

	protected generate() {
		if (!this.tone) {
			return;
		}
		const values = this.tone.getFrequencyResponse(this.width);
		this.draw(values);
	}

	bind(tone: import("tone").ToneAudioNode) {
		this.tone = tone as import("tone").Filter;
		this.generate();
	}
}
