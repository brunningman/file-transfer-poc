const Path = require('path');
const SRC_DIR = Path.resolve('src');
const BUILD_DIR = Path.resolve('public');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: 'http://localhost:3000/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: Path.resolve('node_modules'),
        loader: 'babel-loader',
        options: {
          presets: [ '@babel/preset-env', '@babel/preset-react' ]
        }
      }
    ]
  }
}