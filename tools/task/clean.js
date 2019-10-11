const del = require('del');
const { task } = require('gulp');
const { dest, tmp } = require('../define');

task('clean', del.bind(null, [dest, tmp]));
