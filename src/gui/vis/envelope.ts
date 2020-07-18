import { VisBase } from "./vis-base";
import { html, customElement } from "lit-element";
import { styleMap } from "lit-html/directives/style-map";

@customElement("tone-envelope-vis")
export class ToneEnvelopeVis extends VisBase {
	private tone: import("tone").Envelope;

	protected async generate() {
		if (!this.tone) {
			return;
		}
		const values = await this.tone.asArray(this.width);
		this.draw(values);
		this.requestUpdate();
	}

	bind(tone: import("tone").ToneAudioNode) {
		this.tone = tone as import("tone").Envelope;
		this.generate();
	}

	render() {
		const times = [];
		if (this.tone) {
			const tickCount = 4;
			// add the timing to the bottom
			const totalDuration =
				1.1 *
				(this.tone.toSeconds(this.tone.attack) +
					this.tone.toSeconds(this.tone.decay) +
					this.tone.toSeconds(this.tone.release));
			// scoot the canvas up 10px
			// context.drawImage(canvas, 0, 0, this.width, this.height - 10);
			const subdivision = Math.pow(
				2,
				Math.ceil(Math.log2(totalDuration / tickCount))
			);
			const rounding =
				(subdivision.toString().split(".")[1] &&
					subdivision.toString().split(".")[1].length) ||
				0;

			for (
				let time = 0;
				time < totalDuration * 0.9;
				time += subdivision
			) {
				const x = time / totalDuration;
				times.push({
					x,
					time: time.toFixed(rounding),
				});
			}
		}
		return html`
			<style>
				#timeline {
					margin-top: -10px;
					font-size: 10px;
					font-family: monospace;
					position: relative;
					height: 20px;
				}
				#timeline span {
					position: absolute;
				}
			</style>
			${super.render()}
			<div id="timeline">
				${times.map(
					({ x, time }) => html`
						<span
							style=${styleMap({
								left: `${(x * 100).toFixed(2)}%`,
							})}
						>
							${time}s
						</span>
					`
				)}
			</div>
		`;
	}
}
