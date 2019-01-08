const { resolve } = require('path')

module.exports = {
	context : resolve(__dirname, 'src'),
	entry : ['core-js', './index.js'],
	output : {
		path : resolve(__dirname, 'build'),
		filename : 'tonejs-ui.js'
	},
	resolve : {
		// modules : ['node_modules']
	},
	module : {
		rules : [
			{
				test : /\.js$/,
				exclude : /(node_modules)/,
				use : {
					loader : 'babel-loader',
					// options : {
					// 	presets : ['@babel/preset-env']
					// }
				}
			},
			{ 
				test : /\.scss$/, 
				use : [
					'to-string-loader', 
					'css-loader', 
					'sass-loader?indentedSyntax=false'
				]
			},
			{ 
				test : /\.css$/, 
				use : [
					'style-loader',
					'css-loader'
				]
			},
		]
	},
	plugins : [
		
	]
}
