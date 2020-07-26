import {
	LitElement,
	property,
	html,
	customElement,
	query,
	css,
	internalProperty,
} from "lit-element";
import { version, ToneAudioBuffer } from "tone";
import { Plot } from "@tonejs/plot";
import { plotlyStyle } from "./plotly";
import { classMap } from "lit-html/directives/class-map";

@customElement("tone-code-iframe")
export class SandboxCode extends LitElement {
	@property()
	loading = false;

	@internalProperty()
	private error = "";

	@internalProperty()
	private consoleOpen = false;

	@query("#container")
	private container: HTMLDivElement;

	private plot: HTMLElement = null;

	@internalProperty()
	private running = false;

	/**
	 * The current iframe
	 */
	private iframe: HTMLIFrameElement;

	/**
	 * Past events written to the console
	 */
	private consoleData: string[] = [];

	private createIframe() {
		this.iframe = document.createElement("iframe");
		this.iframe.sandbox.add("allow-scripts");
		this.iframe.sandbox.add("allow-same-origin");
		this.iframe.allow = "autoplay";
	}

	private iframeHeader(channelName: string) {
		return /*javascript*/ `
			<style>
				body {
					height: 300px;
					margin: 0px;
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
				}
			</style>
			<script>
			const broadcast = new BroadcastChannel("${channelName}")
			// don't print the tone.js logging to the console
			window.TONE_SILENCE_LOGGING = true;
			//overwrite console.log to send info the client
			const originalLog = console.log.bind(console)
			console.log = (...args) => {
				originalLog(...args)
				// defer the logging until after it's loaded
				setTimeout(() => {
					broadcast.postMessage({ console : args })
				}, 10)
			}
			</script>
			
			`;
	}

	private iframeBody() {
		return /* javascript */ `
			<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/${version}/Tone.js"></script>
			<script>
				window.onerror = e => {
					broadcast.postMessage({ error : e })
				}
				// turn off after 10 seconds
				Tone.Destination.volume.rampTo(-Infinity, 1, "+29")
				setTimeout(() => {
					broadcast.postMessage({ done : true })
				}, 30500)
			</script>
		`;
	}

	private iframeCode(code: string) {
		return `
			<script>
				async function main(){
					const response = (() => {
						${code}
					})()
					if (response instanceof Promise){
						const output = await response
						if (output instanceof Tone.ToneAudioBuffer){
							broadcast.postMessage({
								audiobuffer: output.toArray()
							})
						}
					}
					await Tone.loaded()
					broadcast.postMessage({
						loaded: true
					})
				}
				main()
			</script>
		`;
	}

	private uniqueid(): string {
		return Math.random().toString(36).substr(2, 9);
	}

	private async logOutput(data: any) {
		if (Reflect.has(data, "console")) {
			this.consoleData.push(
				data.console
					.map((c) => JSON.stringify(c, undefined, "\t"))
					.join(" ")
			);
			if (this.consoleData.length > 10) {
				this.consoleData.shift();
			}
			this.requestUpdate();
		} else if (Reflect.has(data, "audiobuffer")) {
			const audio = ToneAudioBuffer.fromArray(data.audiobuffer);
			this.plot = await Plot.signal(audio);
			this.requestUpdate();
			// stop the online context from running
			this.running = false;
		} else if (Reflect.has(data, "error")) {
			this.error = data.error;
			this.cancel();
		} else if (Reflect.has(data, "done")) {
			this.cancel();
		}
	}

	async run(code: string) {
		this.cancel();
		this.running = true;
		this.error = "";
		const uid = this.uniqueid();
		const broadcastChannel = new BroadcastChannel(uid);
		const firstMessage: Promise<any> = new Promise((done) => {
			broadcastChannel.addEventListener("message", (e) => {
				done(e.data);
				this.logOutput(e.data);
			});
		});

		const content =
			this.iframeHeader(uid) + this.iframeBody() + this.iframeCode(code);
		const blob = new Blob([content], { type: "text/html" });
		this.createIframe();
		this.container.appendChild(this.iframe);
		const loaded = new Promise((done, onerror) => {
			this.iframe.onload = done;
			this.iframe.onerror = onerror;
		});
		this.iframe.src = URL.createObjectURL(blob);
		await loaded;
		const message = await firstMessage;
		if (Reflect.has(message, "error")) {
			throw new Error(message.error);
		}
	}

	updated(changed) {
		if (changed.has("running")) {
			if (this.running) {
				this.consoleData = [];
				this.requestUpdate();
				this.plot = null;
			} else {
				this.iframe?.remove();
				this.dispatchEvent(new CustomEvent("stop"));
			}
		}
	}

	async cancel() {
		this.running = false;
	}

	static get styles() {
		return [
			plotlyStyle,
			css`
				:host {
					display: block;
					position: relative;
					padding: 10px;
				}
				#container {
					height: 0px;
					overflow: hidden;
				}
				#plot {
					position: relative;
					display: inline-block;
				}
				#response {
					border-left: 2px solid #aaa;
					padding-left: 10px;
				}
				details {
					font-family: monospace;
					opacity: 0;
					font-size: 16px;
					transition: opacity 0.2s;
					height: 0px;
					pointer-events: none;
				}

				details.visible {
					padding-bottom: 10px;
					opacity: 1;
					height: auto;
					pointer-events: initial;
				}
				#error {
					color: red;
				}
			`,
		];
	}

	render() {
		return html`<div id="container"></div>
			<details
				id="error"
				open
				class=${classMap({
					visible: this.error !== "",
				})}
			>
				<summary> error</summary>
				${this.error}</details
			>
			<details
				id="console"
				?open=${this.consoleOpen}
				@toggle=${() => (this.consoleOpen = !this.consoleOpen)}
				class=${classMap({
					visible: this.consoleData.length > 0,
				})}
			>
				<summary>
					${!this.consoleOpen && this.consoleData.length > 0
						? `${this.consoleData[this.consoleData.length - 1]}`
						: "console:"}
				</summary>
				<div id="response">
					${this.consoleData.map((s) => html` <div>${s}</div> `)}
				</div>
			</details>
			<details
				open
				class=${classMap({
					visible: this.plot !== null,
				})}
			>
				<summary> graph </summary>
				<div id="plot">
					${this.plot}
				</div>
			</details> `;
	}
}
