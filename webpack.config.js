/** @format */

const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		fallback: { stream: require.resolve('stream-browserify') },
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			// Добавлено для обработки стилей
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			// Добавлено для обработки изображений
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			// Добавлено для обработки других типов файлов, если это необходимо
		],
	},
};
