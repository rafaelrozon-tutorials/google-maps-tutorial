const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv');

const config = dotenv.config({ encoding: 'utf-8' });

module.exports = {
  entry: ["./src/app.js"],
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public")
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
        inject: "body",
        template: "./src/index.ejs",
        GOOGLE_MAPS_KEY: config.parsed.GOOGLE_MAPS_KEY
    }),
    new BrowserSyncPlugin({
      files: ["src/**/*.js"],
      server: {
        baseDir: ["./public"]
      },
      port: 3000,
      host: "localhost",
      open: false
    }),
    new MiniCssExtractPlugin({
      filename: "app.css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  target: "web",
  mode: "development"
};
