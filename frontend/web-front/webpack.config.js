const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/pages/index.tsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'main.js',
	},
	module: {
		rules: [
			{
				/* TypeScriptのモジュール */
				test: /\.(ts|tsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: { presets: ['@babel/preset-env', '@babel/react'] },
					},
					{
						loader: 'ts-loader',
						options: { configFile: path.resolve(__dirname, 'tsconfig.json') },
					},
				],
			},
			{
				/* CSSのモジュール */
				test: /\.(css|scss)$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
				],
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		port: 3000,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
		fallback: {
			fs: false,
			os: false,
			path: false,
			stream: false,
			zlib: false,
		},
	},
	target: 'web',
};
