import { customElement } from "lit-element";
import { VisBase } from "./vis-base";

type ToneAudioBuffer = import("tone").ToneAudioBuffer;
type ToneAudioNode = import("tone").ToneAudioNode;

type ToneAudioNodeWithBuffer = import("tone").ToneAudioNode & {
	buffer: ToneAudioBuffer;
};

@customElement("tone-buffer-vis")
export class ToneBufferViz extends VisBase {
	private tone: ToneAudioNodeWithBuffer;

	protected async generate() {
		if (!this.tone) {
			return;
		}
		if (!this.tone.buffer.loaded) {
			await new Promise((done) => (this.tone.buffer.onload = done));
		}
		const values = this.tone.buffer.getChannelData(0);
		this.draw(values);
	}

	bind(tone: ToneAudioNode) {
		this.tone = tone as ToneAudioNodeWithBuffer;
		this.generate();
	}
}
