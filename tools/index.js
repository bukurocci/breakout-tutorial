const { task, series, parallel } = require('gulp');
const requireDir = require('require-dir');

requireDir('./task', { recurse: true });

task('build', series('clean', parallel('svgsprite', 'script', 'pug', 'sass', 'copy', 'imagemin')));

task('default', series('watch'));
