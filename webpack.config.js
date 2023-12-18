/** @format */

module.exports = {
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
