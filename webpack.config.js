module.exports = {
  entry: "./src/demo.js",
  output: {
    filename: "demo.js",
    path: "./"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
    ]
  }
};
