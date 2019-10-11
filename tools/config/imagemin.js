const path = require('path');
const { src, dest } = require('../define');

const imageminConfig = {
  src: path.join(src, 'images/**/*'),
  dest: path.join(dest, 'assets/images/'),
  options: {
    verbose: true
  },
  gifsicle: {
    options: {}
  },
  mozjpeg: {
    options: {
      quality: 80,
      progressive: false
    }
  },
  pngquant: {
    options: {
      speed: 1,
      strip: true,
      quality: [0.6, 0.8]
    }
  },
  svgo: {
    options: {}
  }
};

module.exports = imageminConfig;
