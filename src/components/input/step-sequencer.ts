import { css, customElement, html, LitElement, property, query, unsafeCSS } from "lit-element";
import * as Tone from "tone";
const style = require("./step-sequencer.scss");

@customElement("tone-step-sequencer")
export class ToneStepSequencer extends LitElement {
	
	@property({ type: Number })
	columns = 16;

	@property({ type: Number })
	rows = 4;

	@property({ type: String })
	subdivision = "8n";

	private _sequencer: Tone.Sequence;

	private _matrix: boolean[][] = [];

	@query("#container")
	private _container: HTMLDivElement

	@property({ type: Number })
	private highlighted = -1;

	private started = false;

	update(changed) {
		if (changed.has("columns") || changed.has("subdivision")) {
			if (this._sequencer) {
				this._sequencer.dispose();
			}
			this._sequencer = new Tone.Sequence(this._tick.bind(this), this._indexArray(this.columns), this.subdivision).start(0);
		}
		if (changed.has("columns") || changed.has("rows")) {
			this._matrix = this._indexArray(this.columns).map(() => {
				return this._indexArray(this.rows).map(() => false);
			});
		}
		super.update(changed);
	}

	firstUpdated(props) {
		super.firstUpdated(props);
		Tone.Transport.on("start", () => this.started = true);
		Tone.Transport.on("stop", () => {
			this.highlighted = -1;
			this.started = false;
		});
	}

	updated(changed) {
		super.updated(changed);
		if (changed.has("rows")) {
			const width = this._container.offsetWidth;
			const cellWidth = width / this.columns;
			this._container.style.height = `${cellWidth * this.rows}px`;
		}
	}

	private _indexArray(count: number): number[] {
		const indices: number[] = [];
		for (let i = 0; i < count; i++) {
			indices.push(i);
		}
		return indices;
	}

	private _tick(time: number, index: number) {
		Tone.Draw.schedule(() => {
			if (this.started) {
				this.highlighted = index;
			}
		}, time);
		this._matrix[index].forEach((value, row) => {
			if (value) {
				row = this.rows - row - 1;
				this.dispatchEvent(new CustomEvent("trigger", {
					detail: {
						time, 
						row,
					},
					composed: true,
				}));
			}
		});
	}

	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	private _updateCell(column, row) {
		this._matrix[column][row] = !this._matrix[column][row];
		this.requestUpdate();
	}

	private _mouseover(e: MouseEvent, column, row) {
		if (e.buttons) {
			this._updateCell(column, row);
		}
	}

	render() {
		return html`
			<div id="container">${this._matrix.map((column, x) => html`
				<div class="column" ?highlighted=${x === this.highlighted}>
					${column.map((cell, y) => html`
						<button 
							@mouseover=${e => this._mouseover(e, x, y)}
							@mousedown=${e => this._mouseover(e, x, y)}
							class="cell" ?filled=${cell}></button>
					`)}
				</div>
			`)}</div>
		`;
	}
}
