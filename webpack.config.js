/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const tsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
	context: __dirname,
	mode: slsw.lib.webpack.isLocal ? "development" : "production",
	entry: slsw.lib.entries,
	devtool: slsw.lib.webpack.isLocal
		? "eval-cheap-module-source-map"
		: "source-map",
	resolve: {
		extensions: [".mjs", ".ts", ".js"],
		symlinks: false,
		cacheWithContext: false,
		plugins: [
			new tsconfigPathsPlugin({
				configFile: "./tsconfig.paths.json",
			}),
		],
	},
	output: {
		libraryTarget: "commonjs",
		path: path.join(__dirname, ".webpack"),
		filename: "[name].js",
	},
	optimization: {
		concatenateModules: false,
	},
	target: "node",
	externals: [nodeExternals(), "aws-sdk"],
	module: {
		rules: [
			// All files with a `.ts` extension will be handled by `ts-loader`
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: [[/node_modules/, /\.serverless/, /\.webpack/]],
				options: {
					transpileOnly: true,
					experimentalWatchApi: true,
				},
			},
		],
	},
};
