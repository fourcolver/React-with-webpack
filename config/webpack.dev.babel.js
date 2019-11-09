import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

import common from './webpack.common.babel';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: true,
  title: 'PME Dashboard',
  hash: true,
});

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    watchContentBase: true,
    compress: true,
    port: 5001,
    stats: 'errors-only',
    open: false,
  },
});
