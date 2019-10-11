const path = require('path');
const { src, dest } = require('../define');

const pugConfig = {
  src: path.join(src, 'view/**/*.pug'),
  dest: dest,
  exclude: path.join(src, 'view/**/_*.pug'),
  options: {
    pretty: true,
    basedir: path.join(src, 'view/'),
    data: {
      site: require('../../site')
    }
  }
};

module.exports = pugConfig;
