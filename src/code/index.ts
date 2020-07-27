// import * as monaco from "monaco-editor";
import {
	property,
	customElement,
	LitElement,
	html,
	query,
	css,
	internalProperty,
	unsafeCSS,
} from "lit-element";
const style = require("monaco-editor/min/vs/editor/editor.main.css");
import { monacoDidLoad } from "./monaco";
import { createEditor, StandaloneCodeEditor } from "./editor";
import "./iframe";
import { SandboxCode } from "./iframe";
import "./progress";

declare const monaco: typeof import("monaco-editor");

@customElement("tone-code")
export class ToneCode extends LitElement {
	@query("slot")
	private slotElement: HTMLSlotElement;

	@query("tone-code-iframe")
	private sandboxCode?: SandboxCode;

	@query("#code")
	private codeElement: HTMLDivElement;

	@internalProperty()
	private hasCode = false;

	@internalProperty()
	private running = false;

	@internalProperty()
	private loading = false;

	@internalProperty()
	private editorLoaded = false;

	private editor?: StandaloneCodeEditor;

	private async updateSlot() {
		await monacoDidLoad;
		if (!this.hasCode) {
			const slotText = this.slotElement?.assignedNodes()[0].parentElement
				.textContent;
			const editor = await createEditor(
				this.codeElement,
				slotText.trim()
			);
			editor.addAction({
				id: "save",
				label: "save and run",
				run: () => this.run(),
				keybindings: [
					monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
					monaco.KeyMod.Shift | monaco.KeyCode.Enter,
				],
			});
			editor.onDidChangeModelContent(() => this.stop());
			this.editor = editor;
			this.hasCode = true;
			this.editorLoaded = true;
		}
	}

	private clicked() {
		if (this.running) {
			this.stop();
		} else {
			this.run();
		}
	}

	private async run() {
		if (!this.running) {
			this.loading = true;
			try {
				await this.sandboxCode?.run(this.editor?.getValue());
				this.running = true;
			} finally {
				this.loading = false;
			}
		}
	}

	private stop() {
		this.sandboxCode?.cancel();
		this.loading = false;
		this.running = false;
	}

	static get styles() {
		return [
			css`
				${unsafeCSS(style)}
			`,
			css`
				:host {
					display: block;
					position: relative;
				}
				#code {
					color: black;
					display: block;
					position: relative;
				}
				.monaco-editor {
					padding-top: 20px;
					padding-bottom: 20px;
				}

				button {
					margin-top: 8px;
					width: 100px;
					border: 1px solid black;
					height: 20px;
					text-align: center;
					appearance: none;
					--webkit-appearance: none;
					background-color: white;
				}

				tone-code-progress {
					position: absolute;
					bottom: -4px;
					left: 0px;
					width: 100%;
				}

				#editor-loading {
					font-size: 0.7em;
					color: #aaa;
				}
			`,
		];
	}

	render() {
		return html`
			<div id="editor-loading">
				${!this.editorLoaded ? "loading editor..." : ""}
			</div>
			<div id="code">
				${!this.hasCode
					? html`<slot @slotchange=${this.updateSlot}></slot>`
					: html``}
				<tone-code-progress
					?running=${this.running}
				></tone-code-progress>
			</div>
			${this.hasCode
				? html`
						<div id="response">
							<button
								@click=${this.clicked}
								?disabled=${this.loading}
							>
								${this.loading
									? "loading..."
									: this.running
									? "stop"
									: "run"}
							</button>
							<tone-code-iframe
								@stop=${this.stop}
							></tone-code-iframe>
						</div>
				  `
				: html``}
		`;
	}
}
