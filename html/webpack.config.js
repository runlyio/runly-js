/* eslint-disable import/no-commonjs */
const version = require("./package.json").version;
const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "runly.js",
		// to serve locally:
		// npm run bundle && serve dist -l 8000
		publicPath:
			process.env.NODE_ENV === "production"
				? `https://cdn.runly.io/v${version}/`
				: "http://localhost:8000/"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				include: [
					path.resolve("./src"),
					path.resolve("../core/src"),
					path.resolve("../bootstrap/src")
				]
			}
		]
	}
};
