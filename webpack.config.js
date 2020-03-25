/* eslint-disable import/no-commonjs */

const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "runly.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: "babel-loader"
				},
				include: [path.resolve("./src")]
			}
		]
	}
};
