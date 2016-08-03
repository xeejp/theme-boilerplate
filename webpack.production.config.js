var path = require('path');

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
      loader: "babel",
      query:{
          presets: ['react', 'es2015']
      }
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
  }
};
