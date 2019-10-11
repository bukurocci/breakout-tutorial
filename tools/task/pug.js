const path = require('path');
const { task, src, dest } = require('gulp');
const { pugConfig } = require('../config/');
const { plumber, data, pug, notify } = require('../plugin');

task('pug', () => {
  const resolved = [];

  if (Array.isArray(pugConfig.src)) {
    resolved.push(...pugConfig.src);
  } else {
    resolved.push(pugConfig.src);
  }

  if (Array.isArray(pugConfig.exclude)) {
    resolved.push(...pugConfig.exclude.map(value => `!${value}`));
  } else {
    resolved.push(`!${pugConfig.exclude}`);
  }

  return src(resolved)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      data(function(file) {
        return {
          pugFilePath: file.path,
          pugFileRelativePath: file.relative,
          outputFilePath: path
            .resolve(pugConfig.dest, file.relative)
            .replace(/\.pug$/, '.html'),
          outputFileRelativePath: file.relative.replace(/\.pug$/, '.html')
        };
      })
    )
    .pipe(pug(pugConfig.options || {}))
    .pipe(dest(pugConfig.dest));
});
