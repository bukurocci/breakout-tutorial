const path = require('path');
const { src, dest } = require('../define');

const svgspriteConfig = {
  src: path.join(src, 'svg/**/*.svg'),
  dest: path.join(dest, 'assets/sprite/'),
  options: {
    shape: {
      dimension: {
        maxWidth: 32,
        maxHeight: 32,
        precision: 2,
        attributes: false
      },
      transform: [
        {
          svgo: {
            plugins: [
              {
                removeTitle: true
              },
              {
                removeStyleElement: true
              },
              {
                removeAttrs: {
                  attrs: 'fill'
                }
              }
            ]
          }
        }
      ]
    },
    mode: {
      symbol: {
        dest: '.',
        sprite: 'sprite.svg'
      }
    }
  }
};

module.exports = svgspriteConfig;
