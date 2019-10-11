const path = require('path');
const os = require('os');
const TerserPlugin = require('terser-webpack-plugin');
const { src, dest } = require('../define');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');

const config = {
  mode: process.env.NODE_ENV,

  // エントリポイントのJavaScript
  entry: {
    bundle: path.join(src, 'js/entry.js')
  },

  devtool: process.env.NODE_ENV === 'development' ? 'sourcemap' : false,

  // 出力先の設定
  output: {
    filename: 'assets/js/[name].js',
    path: dest,
    publicPath: '/'
  },

  watch: process.env.NODE_ENV === 'development',

  // 圧縮設定
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: os.cpus().length - 1,
        sourceMap: true,
        terserOptions: {
          compress: {
            //drop_console: true
          }
        }
      })
    ]
  },

  //プラグイン
  plugins: [
    new HardSourceWebpackPlugin(),
    new AutoDllPlugin({
      filename: '[name].bundle.js',
      path: './assets/js/',
      entry: {
        vendor: ['node-noop']
      }
    }),
    new CompressionPlugin({
      test: /\.js$/,
      compressionOptions: {
        numiterations: 15
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      }
    })
  ],

  module: {
    rules: [
      // Lint
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          fix: true
        }
      },
      // babel
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?cacheDirectory=true'
      }
    ]
  }
};

module.exports = config;
