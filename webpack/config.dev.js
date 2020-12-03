const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const ESLintPlugin = require('eslint-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { merge } = require('webpack-merge');
const portfinder = require('portfinder');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const baseConf = require('./config');

const resolve = dir => path.resolve(__dirname, '..', dir);

const { PORT } = process.env;

if (PORT) {
	portfinder.basePort = PORT;
}

const config = merge(baseConf, {
	entry: ['./src/index.js'],
	devtool: 'eval-cheap-module-source-map',
	performance: {
		hints: false,
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		quiet: true,
		contentBase: [resolve('dll')],
		publicPath: '/',
		compress: true,
		overlay: true,
		stats: 'errors-only',
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				pathRewrite: { '^/api': '' },
			},
		},
	},
	plugins: [
		new WebpackBar({
			name: 'development',
		}),
		new FaviconsWebpackPlugin(resolve('public/favicon.ico')),
		new ESLintPlugin({
			extensions: ['.js', '.jsx'],
		}),
		new webpack.DllReferencePlugin({
			manifest: require(resolve('dll/vendor-manifest.json')),
		}),
		new AddAssetHtmlPlugin([
			{
				filepath: resolve('dll/vendor.js'),
				outputPath: 'vendor',
				publicPath: '/',
			},
		]),
	],
});

module.exports = new Promise((resolve, reject) => {
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err);
			return;
		}

		config.devServer.port = port;

		resolve(config);
	});
});
