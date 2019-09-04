const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// main.js size is 5mb, need to go deep in optimising, minimizing and splitting files

module.exports = {
  stats: {
    //Check in future, no sure it works right.
    entrypoints: false,
    children: false
  },
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "./main.js",
    publicPath: "/", 
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 3000,
    watchContentBase: true,
    progress: true
  },
  plugins: [
    //with this plugin css extracts ok.
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, 
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};