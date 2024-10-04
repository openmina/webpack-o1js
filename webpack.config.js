const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	experiments: {
		topLevelAwait: true,
	},
	entry: path.resolve(__dirname, "bootstrap.js"),
	output: {
		path: path.resolve(__dirname, 'dist'),
		umdNamedDefine: true,
		publicPath: '/',
		filename: "o1jsWrapper.js",
		library: "o1jsWrapper",
		libraryTarget: "umd",
		globalObject: 'this',
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 9000,
		headers: {
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Embedder-Policy': 'require-corp',
		},
	},
}

// module.exports = {
// 	experiments: {
// 		topLevelAwait: true,
// 	},
// 	entry: './bootstrap.js',
// 	output: {
// 		path: path.resolve(__dirname, 'dist'),
// 		umdNamedDefine: true,
// 		publicPath: '/',
// 		filename: "bootstrap.js",
// 		library: "$",
// 		libraryTarget: "umd",
// 	},
// 	plugins: [
// 		new CopyWebpackPlugin({
// 			patterns: [
// 				path.resolve(__dirname, 'index.html'),
// 			],
// 		}),
// 	],
// 	module: {
// 		rules: [
// 			{
// 				test: /\.ts?$/,
// 				use: 'ts-loader',
// 				exclude: /node_modules/,
// 			},
// 			{
// 				test: /\.(js)$/,
// 				exclude: /node_modules/,
// 				use: 'babel-loader',
// 			},
// 		],
// 	},
// 	resolve: {
// 		extensions: ['.tsx', '.ts', '.js'],
// 	},
// 	mode: 'development',
// 	devServer: {
// 		static: {
// 			directory: path.join(__dirname, 'dist'),
// 		},
// 		compress: true,
// 		port: 9000,
// 		headers: {
// 			'Cross-Origin-Opener-Policy': 'same-origin',
// 			'Cross-Origin-Embedder-Policy': 'require-corp',
// 		},
// 	},
// }