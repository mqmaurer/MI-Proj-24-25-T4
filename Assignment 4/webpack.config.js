const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = () => {
  const { NODE_ENV } = process.env;

  return {
    entry: "./src/app.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    mode: NODE_ENV,
    devtool: NODE_ENV === "development" ? "eval-source-map" : false,
    plugins: [
      new ESLintPlugin({
        overrideConfigFile: path.resolve(__dirname, "eslint.config.mjs"),
        configType: "flat",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        favicon: path.resolve(__dirname, "src/assets/favicon.ico"),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets"),
            to: path.resolve(__dirname, "dist"),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      compress: true,
      port: 9000,
    },
  };
};
