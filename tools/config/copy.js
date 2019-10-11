const path = require('path');
const { src, dest, statik } = require('../define');

const copyConfig = {
  font: {
    src: path.join(src, 'fonts/**/*'),
    dest: path.join(dest, 'assets/fonts/')
  },
  static: {
    src: path.join(statik, '/**/*'),
    dest: dest
  }
};

module.exports = copyConfig;
