const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1,
      cacheGroups: {
        moduleA: {
          test: /[\\/]src[\\/]moduleA\.js/,
          name: 'moduleA',
          chunks: 'all',
        },
        moduleB: {
          test: /[\\/]src[\\/]moduleB\.js/,
          name: 'moduleB',
          chunks: 'all',
        },
      },
    },
  },
};
