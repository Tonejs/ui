const srcPath =
	"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min";
// @ts-ignore
window.MonacoEnvironment = {
	getWorkerUrl() {
		return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
		self.MonacoEnvironment = {
		  baseUrl: '${srcPath}'
		};
		importScripts('${srcPath}/vs/base/worker/workerMain.js');`)}`;
	},
};

function loadScript(path) {
	return new Promise((done, error) => {
		const loaderScript = window.document.createElement("script");
		loaderScript.type = "text/javascript";
		loaderScript.addEventListener("load", done);
		loaderScript.addEventListener("error", error);
		loaderScript.src = path;
		window.document.body.appendChild(loaderScript);
	});
}

async function loadMonaco() {
	await loadScript(`${srcPath}/vs/loader.min.js`);
	// @ts-ignore
	window.require.config({
		paths: {
			vs: srcPath + "/vs",
		},
	});
	await loadScript(`${srcPath}/vs/editor/editor.main.js`);
	await new Promise((done) => {
		const interval = setInterval(() => {
			if (Reflect.has(window, "monaco")) {
				clearInterval(interval);
				done();
			}
		}, 100);
	});
}

export const monacoDidLoad = loadMonaco();
