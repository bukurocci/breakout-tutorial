const copyConfig = require('./copy');
const imageminConfig = require('./imagemin');
const pugConfig = require('./pug');
const serverConfig = require('./server');
const sassConfig = require('./sass');
const svgspriteConfig = require('./svgsprite');
const watchConfig = require('./watch');
const webpackConfig = require('./webpack.config');

module.exports = {
  copyConfig,
  imageminConfig,
  pugConfig,
  serverConfig,
  sassConfig,
  svgspriteConfig,
  watchConfig,
  webpackConfig
};
