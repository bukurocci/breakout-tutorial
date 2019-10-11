const { task } = require('gulp');
const PluginError = require('plugin-error');
const webpack = require('webpack');

const compile = (options, done) => {
  const compiler = webpack(options);

  compiler.run((err, stats) => {
    handleCompileCallback(err, stats, done);
  });
};

const handleCompileCallback = (err, stats, done) => {
  if (err) {
    throw new PluginError('Webpack Task Error', err, {
      showStack: true,
      showProperties: false
    });
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    info.errors.forEach(error => {
      console.error(error);
    });
  }

  if (stats.hasWarnings()) {
    info.warnings.forEach(warning => {
      console.warn(warning);
    });
  }

  console.info(stats.toString({ colors: true }));

  done();
};

task('script', done => {
  const config = require(`../config/webpack.config`);
  compile(config, done);
});
