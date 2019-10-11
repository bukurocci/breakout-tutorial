const pugConfig = require('./pug');
const sassConfig = require('./sass');
const imageminConfig = require('./imagemin');
const svgspriteConfig = require('./svgsprite');
const copyConfig = require('./copy');

const watchConfig = {
  view: pugConfig.src,
  sass: sassConfig.src,
  image: imageminConfig.src,
  svgsprite: svgspriteConfig.src,
  copy: Object.entries(copyConfig).map(entry => {
    const [, value] = entry;
    return value.src;
  })
};

module.exports = watchConfig;
