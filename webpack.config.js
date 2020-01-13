const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /plugin\.css$/,
				use: ['style-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	devServer: {
		port: 3000,
		historyApiFallback: true
	},
	output: {
		path: path.join(__dirname + '/dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
};