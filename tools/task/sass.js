const { src, dest, task } = require('gulp');
const { sassConfig } = require('../config/');
const plugin = require('../plugin');
const server = require('../server');

task('sass', () => {
  const autoprefixer = require('autoprefixer');
  const cssmqpacker = require('css-mqpacker');
  const csswring = require('csswring');
  const {
    sourcemaps,
    sass,
    stylelint,
    postcss,
    if: gulpif,
    plumber,
    notify,
    zopfliGreen: zopfli
  } = plugin;

  const isProductionBuild = process.env.NODE_ENV === 'production';

  return src(sassConfig.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(stylelint(sassConfig.stylelint.options))
    .pipe(gulpif(!isProductionBuild, sourcemaps.init()))
    .pipe(sass(sassConfig.options).on('error', sass.logError))
    .pipe(
      postcss([
        autoprefixer(sassConfig.autoprefixer.options),
        cssmqpacker(sassConfig.cssmqpacker.options),
        csswring(sassConfig.csswring.options)
      ])
    )
    .pipe(gulpif(!isProductionBuild, sourcemaps.write('./')))
    .pipe(dest(sassConfig.dest))
    .pipe(server.stream({ match: '**/*.css' }))
    .pipe(zopfli(sassConfig.zopfli.options))
    .pipe(dest(sassConfig.dest));
});
