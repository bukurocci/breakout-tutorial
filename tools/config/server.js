const { dest } = require('../define');
const pugMiddleware = require('../middleware/browsersync-pug-middleware');

const serverConfig = {
  options: {
    files: ['assets/js/**/*.js'],
    server: {
      baseDir: dest
    },
    startPath: './',
    middleware: [pugMiddleware]
  }
};

module.exports = serverConfig;
