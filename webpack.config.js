/* eslint-disable @typescript-eslint/no-var-requires */
const { relative, basename, extname, resolve } = require("path");
const glob = require("glob");

const examples = {};
glob.sync(resolve(__dirname, "./examples/**/*.ts")).forEach((example) => {
	const name = basename(example, extname(example));
	examples[name] = "./" + relative(__dirname, example);
});

function createCommonConfig(output) {
	return {
		context: __dirname,
		output: {
			path: resolve(__dirname, output),
			filename: "[name].js",
		},
		resolve: {
			extensions: [".ts", ".js"],
		},
		externals: {
			tone: "Tone",
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /(node_modules)/,
					use: {
						loader: "ts-loader",
					},
				},
				{
					test: /\.scss$/,
					use: [
						"to-string-loader",
						"css-loader",
						{
							loader: "sass-loader",
							options: {
								sassOptions: {
									indentedSyntax: false,
									includePaths: ["node_modules"],
								},
							},
						},
					],
				},
				{
					test: /\.css$/,
					use: ["to-string-loader", "css-loader"],
				},
				{
					test: /\.ttf$/,
					use: ["file-loader"],
				},
			],
		},
	};
}

module.exports = (env) => {
	env = env || {};
	env.output = env.output || "build";
	return [
		Object.assign({}, createCommonConfig(env.output), {
			entry: {
				components: "./src/components/index.ts",
			},
		}),
		Object.assign({}, createCommonConfig(env.output), {
			entry: {
				code: "./src/code/index.ts",
			},
		}),
		Object.assign({}, createCommonConfig(env.output), {
			entry: {
				gui: "./src/gui/index.ts",
			},
			output: {
				path: resolve(__dirname, env.output),
				filename: "tone-ui.js",
				libraryTarget: "umd",
			},
		}),
	];
};
