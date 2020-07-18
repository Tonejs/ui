import { html, LitElement, property, customElement } from "lit-element";

export abstract class VisBase extends LitElement {
	@property({ type: String })
	protected bgcolor = "white";

	@property({ type: String })
	protected color = "black";

	@property({ type: Object })
	protected values = {};

	@property({ type: Number })
	protected height = 100;

	@property({ type: Number })
	protected width = 310;

	protected normalizeCurve = true;
	private timeout: number;

	protected scale(
		v: number,
		inMin: number,
		inMax: number,
		outMin: number,
		outMax: number
	): number {
		return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
	}

	protected abstract async generate();

	draw(values: Float32Array) {
		const canvas = this.shadowRoot.querySelector("canvas");
		if (canvas) {
			const context = canvas.getContext("2d");
			canvas.height = this.height;
			canvas.width = this.width;
			const width = canvas.width;
			const height = canvas.height;
			context.clearRect(0, 0, width, height);
			const maxValuesLength = 2048;
			if (values.length > maxValuesLength) {
				const resampled = new Float32Array(maxValuesLength);
				// down sample to maxValuesLength values
				for (let i = 0; i < maxValuesLength; i++) {
					resampled[i] =
						values[
							Math.floor((i / maxValuesLength) * values.length)
						];
				}
				values = resampled;
			}
			const max = this.normalizeCurve
				? Math.max(0.001, ...values) * 1.1
				: 1;
			const min = this.normalizeCurve
				? Math.min(-0.001, ...values) * 1.1
				: 0;

			const lineWidth = 3;
			context.lineWidth = lineWidth;
			context.beginPath();
			for (let i = 0; i < values.length; i++) {
				const v = values[i];
				const x = this.scale(
					i,
					0,
					values.length,
					lineWidth,
					width - lineWidth
				);
				const y = this.scale(v, max, min, 0, height - lineWidth);
				if (i === 0) {
					context.moveTo(x, y);
				} else {
					context.lineTo(x, y);
				}
			}
			context.lineCap = "round";
			context.strokeStyle = "white";
			context.stroke();
		}
	}

	updated() {
		clearTimeout(this.timeout);
		this.timeout = (setTimeout(() => {
			this.generate();
		}, 50) as unknown) as number;
	}

	render() {
		return html`
			<style>
				#container {
					margin-top: 5px;
				}

				canvas {
					background-color: #aaa;
					width: 100%;
					border-radius: 4px;
					height: ${this.height}px;
				}
			</style>
			<div id="container">
				<canvas></canvas>
			</div>
		`;
	}
}
