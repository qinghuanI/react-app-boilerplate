const path = require('path');
const Webpackbar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const baseConf = require('./config');
const { TARGET } = process.env;
const resolve = dir => path.resolve(__dirname, '..', dir);

const config = {
	mode: 'production',
	devtool: false,
	output: {
		path: resolve('dist'),
		publicPath: TARGET === 'github' ? '/react-app-boilerplate' : '/',
		filename: 'js/[name].[contenthash].js',
		chunkFilename: 'js/[name].[contenthash].js'
	},
	performance: {
		hints: false
	},
	optimization: {
		usedExports: true,
		minimize: true,
		minimizer: [
			new TerserPlugin(),
			new ESBuildMinifyPlugin({
				target: 'es2015'
			})
		]
	},
	plugins: [
		new Webpackbar({
			name: 'production'
		}),
		new WebpackManifestPlugin(),
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: resolve('public/favicon.ico'),
					to: resolve('dist')
				}
			]
		})
	]
};

module.exports = merge(baseConf, config);
