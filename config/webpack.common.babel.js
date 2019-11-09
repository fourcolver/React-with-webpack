import path from 'path';

import rules from './rules';

const pathToApp = path.resolve(__dirname, '../', 'src', 'app');
const pathToNodeModules = path.resolve(__dirname, '../', 'node_modules');

export default {
  entry: {
    app: path.resolve(__dirname, '../', 'src/index.jsx'),
    styles: path.resolve(__dirname, '../', 'src/assets/styles/index.scss'),
  },
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.png', '.jpg'],
    modules: [pathToApp, pathToNodeModules],
  },
  module: {
    rules,
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },
  },
};
