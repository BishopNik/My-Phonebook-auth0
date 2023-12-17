/** @format */

const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	// Другие опции конфигурации webpack...
	resolve: {
		fallback: { stream: require.resolve('stream-browserify') },
	},
};
