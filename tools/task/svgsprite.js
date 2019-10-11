const { src, dest, task } = require('gulp');
const { svgspriteConfig } = require('../config/');
const plugin = require('../plugin');

task('svgsprite', () => {
  const { svgSprite, plumber, notify } = plugin;

  return src(svgspriteConfig.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(svgSprite(svgspriteConfig.options))
    .pipe(dest(svgspriteConfig.dest));
});
