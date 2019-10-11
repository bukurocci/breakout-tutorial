const path = require('path');

const define = {
  dest: path.resolve('public/'),
  src: path.resolve('src/'),
  statik: path.resolve('static/'),
  tmp: path.resolve('.tmp/')
};

module.exports = define;
