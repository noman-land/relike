const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/js/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js',
  },
  plugins: [
    // Copy index.html to build folder
    new CopyWebpackPlugin([{
      from: './app/index.html',
      to: 'index.html',
    }]),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.sass$/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader?browsers=last 3 versions',
          'sass-loader?outputStyle=expanded',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
    ],
  },
};
