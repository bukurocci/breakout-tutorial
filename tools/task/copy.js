const { src, dest, task, parallel } = require('gulp');
const { copyConfig } = require('../config/');
const plugin = require('../plugin');

const streams = Object.entries(copyConfig).map(entry => {
  const { changed } = plugin;
  const [key, value] = entry;

  const task = () => {
    return src(value.src)
      .pipe(changed(value.dest))
      .pipe(dest(value.dest));
  };

  task.displayName = `copy:${key}`;

  return task;
});

task('copy', parallel(...streams));
