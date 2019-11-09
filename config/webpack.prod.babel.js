import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import common from './webpack.common.babel';

export default merge(common, {
  mode: 'production',
  plugins: [
    new HardSourceWebpackPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
        warnings: false,
        compress: {
          unused: true,
          dead_code: true,
          drop_debugger: true,
          drop_console: true,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
  ],
});
