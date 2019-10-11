const gulp = require('gulp');
const server = require('../server');

gulp.task('reload', done => {
  server.reload();
  done();
});
