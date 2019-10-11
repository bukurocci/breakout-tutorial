const webpack = require('webpack');
const { task, watch, series } = require('gulp');
const { watchConfig, serverConfig, webpackConfig } = require('../config/');
const server = require('../server');

task('watch', done => {
  webpackConfig.watch = true; //watchする必要があるので強制的にtrueにする
  webpackConfig.mode = process.env.NODE_ENV;

  const compiler = webpack(webpackConfig);
  compiler.watch(webpackConfig.watchOptions || {}, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.info(stats.toString({ colors: true }));
  });

  watch(watchConfig.svgsprite, series('svgsprite'));
  watch(watchConfig.sass, series('sass'));
  watch(watchConfig.view, series('reload'));
  watch(watchConfig.image, series('imagemin'));
  watch(watchConfig.copy, series('copy'));

  server.init(serverConfig.options, done);
});
