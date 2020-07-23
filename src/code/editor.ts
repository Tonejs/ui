declare const monaco: typeof import("monaco-editor");
import { version } from "tone";

export type StandaloneCodeEditor = import("monaco-editor").editor.IStandaloneCodeEditor;

async function fetchDefinition() {
	//get the currently loaded version on the page
	const url = `https://tonejs.github.io/docs/${version}/assets/tone.d.ts`;
	const response = await fetch(url);
	if (response.ok) {
		return await response.text();
	} else {
		throw new Error("couldn't load description");
	}
}

const tsDef = fetchDefinition();

export async function createEditor(
	element: HTMLElement,
	content: string
): Promise<StandaloneCodeEditor> {
	const model = monaco.editor.createModel(content, "typescript");
	const editor = monaco.editor.create(element, {
		model,
		theme: "vs-dark",
		scrollBeyondLastLine: false,
		minimap: {
			enabled: false,
		},
		lineNumbers: "on",
	});
	monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
		target: monaco.languages.typescript.ScriptTarget.ES2015,
		allowNonTsExtensions: true,
		lib: ["ES2015"],
	});

	/**
	 * Add the declaration
	 */
	let declr = await tsDef;

	// wrap it in the namespace instead of module declaration
	declr = declr.replace("declare module 'tone' {", "namespace Tone {");

	// add the console
	declr += `
		interface Console {
			log(message?: any, ...optionalParams: any[]): void;
		}
		declare var Console: {
			prototype: Console;
			new(): Console;
		};
		const console = new Console()
	`;

	monaco.languages.typescript.typescriptDefaults.addExtraLib(
		declr,
		"file:///node_modules/tone/index.d.ts"
	);
	monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
		noSemanticValidation: true,
		noSyntaxValidation: true,
	});

	return editor;
}
