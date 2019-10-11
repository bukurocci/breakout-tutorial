const path = require('path');
const { src, dest } = require('../define');
const packageImporter = require('node-sass-package-importer');
const globImporter = require('node-sass-glob-importer');
const formatterPretty = require('stylelint-formatter-pretty');

const sassConfig = {
  src: path.join(src, 'style/**/*.scss'),
  dest: path.join(dest, 'assets/css/'),
  options: {
    importer: [
      packageImporter({
        extensions: ['.scss', '.css']
      }),
      globImporter()
    ]
  },
  stylelint: {
    options: {
      reporters: [{ formatter: formatterPretty, console: true }]
    }
  },
  autoprefixer: {
    options: {}
  },
  cssmqpacker: {
    options: {
      sort: true
    }
  },
  csswring: {
    options: {}
  },
  zopfli: {
    options: {
      numiterations: 15,
      verbose: true
    }
  }
};

module.exports = sassConfig;
