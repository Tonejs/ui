import { VisBase } from "./vis-base";
import { customElement, html } from "lit-element";
import * as Color from "color";
import { styleMap } from "lit-html/directives/style-map";

@customElement("tone-meter-vis")
export class ToneMeterElement extends VisBase {
	protected height = 40;
	private tone: import("tone").Meter;

	private meterLevels: number[] = [];

	protected generate() {
		// ignored
	}

	private loop() {
		requestAnimationFrame(this.loop.bind(this));
		if (!this.tone) {
			return;
		}
		const values = this.tone.getValue();
		this.meterLevels = Array.isArray(values) ? values : [values];
		this.requestUpdate();
	}

	bind(tone: import("tone").ToneAudioNode) {
		this.tone = tone as import("tone").Meter;
		this.tone.normalRange = true;
		this.loop();
	}

	private renderColor(val: number): string {
		return Color("#aaa")
			.mix(Color("rgb(209, 196, 15)"), Math.pow(val, 0.5))
			.hex();
	}

	render() {
		return html`
			<style>
				#container {
					display: flex;
					align-items: flex-end;
					border: 2px outset #ddd;
					border-color: transparent transparent #ddd;
				}
				.level {
					flex: 1;
					background-color: #aaa;
					margin: 2px;
					min-height: 2px;
					border-top-left-radius: 2px;
					border-top-right-radius: 2px;
				}
			</style>
			<div
				id="container"
				style=${styleMap({
					height: `${this.height}px`,
				})}
			>
				${this.meterLevels.map(
					(val) => html`
						<div
							class="level"
							style=${styleMap({
								height: `${(Math.pow(val, 0.2) * 100).toFixed(
									2
								)}%`,
								backgroundColor: this.renderColor(val),
							})}
						></div>
					`
				)}
			</div>
		`;
	}
}

interface MeterOptions {
	parent?: HTMLElement;
	tone: import("tone").Meter;
	height?: number;
}

/**
 * Create an audio node element
 */
export function createMeter({
	tone,
	parent,
	height,
}: MeterOptions): ToneMeterElement {
	const element = document.createElement(
		"tone-meter-vis"
	) as ToneMeterElement;
	element.bind(tone);
	if (parent) {
		parent.appendChild(element);
	}
	if (height) {
		element.setAttribute("height", height.toString());
	}
	return element;
}
