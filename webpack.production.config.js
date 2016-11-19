var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    host: ["babel-polyfill", "./host/index.js"],
    participant: ["babel-polyfill", "./participant/index.js"],
  },
  output: {
    path: "./",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel"
    }]
  },
  resolve: {
    root: [
      path.resolve('./')
    ],
    extensions: [
      "", ".js"
    ],
    modulesDirectories: [
      "node_modules",
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]
};
