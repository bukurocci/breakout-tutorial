const { task, src, dest } = require('gulp');
const { imageminConfig } = require('../config/');

const server = require('../server');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

task('imagemin', () => {
  const {
    imagemin,
    changed,
    plumber,
    notify,
    if: gulpif
  } = require('../plugin');

  return src(imageminConfig.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      gulpif(
        process.env.NODE_ENV !== 'production',
        changed(imageminConfig.dest)
      )
    )
    .pipe(
      gulpif(
        // imageminの処理自体が重たく時間がかかるためproductionビルド時に行う
        process.env.NODE_ENV === 'production',
        imagemin(
          [
            imagemin.gifsicle(imageminConfig.gifsicle.options),
            mozjpeg(imageminConfig.mozjpeg.options),
            pngquant(imageminConfig.pngquant.options),
            imagemin.svgo(imageminConfig.svgo.options)
          ],
          imageminConfig.options
        )
      )
    )
    .pipe(dest(imageminConfig.dest))
    .pipe(server.stream());
});
