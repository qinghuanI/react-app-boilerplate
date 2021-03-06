const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const ESLintPlugin = require('eslint-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { merge } = require('webpack-merge');
const portfinder = require('portfinder');
const {
	createLaunchEditorMiddleware
} = require('react-dev-inspector/plugins/webpack');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const baseConf = require('./config');

const resolve = dir => path.resolve(__dirname, '..', dir);

const { PORT } = process.env;

if (PORT) {
	portfinder.basePort = PORT;
}

const config = merge(baseConf, {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	performance: {
		hints: false
	},
	cache: true,
	devServer: {
		before: app => {
			app.use(createLaunchEditorMiddleware());
		},
		historyApiFallback: true,
		hot: true,
		inline: true,
		quiet: true,
		contentBase: [resolve('dll')],
		publicPath: '/',
		compress: true,
		overlay: true,
		stats: 'errors-only'
	},
	plugins: [
		new WebpackBar({
			name: 'development'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new FaviconsWebpackPlugin(resolve('public/favicon.ico')),
		new ESLintPlugin({
			extensions: ['.js', '.jsx']
		}),
		new StylelintPlugin(),
		new HardSourceWebpackPlugin()
	]
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
