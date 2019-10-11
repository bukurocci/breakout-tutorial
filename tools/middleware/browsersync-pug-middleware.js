const url = require('url');
const path = require('path');
const fs = require('fs');
const pug = require('pug');
const { src, dest } = require('../define');
const pugConfig = require('../config/pug');
const viewPath = path.join(src, 'view/');

const pugMiddleware = (req, res, next) => {
  const cwd = process.cwd();
  const pathname = url.parse(req.url).pathname;
  const reShouldCompile = /(\/|\.html)$/;

  if (!reShouldCompile.test(pathname)) {
    return next();
  }

  const htmlPath =
    path.parse(pathname).ext === '' ? `${pathname}index.html` : pathname;
  const pugPath = path.join(viewPath, htmlPath.replace(/\.html$/, '.pug'));

  const data = {
    pugFilePath: pugPath,
    pugFileRelativePath: path.relative(viewPath, pugPath),
    outputFilePath: path.join(dest, htmlPath),
    outputFileRelativePath: htmlPath.replace(/^\//, '')
  };

  const opts = Object.assign({}, pugConfig.options);

  fs.access(pugPath, fs.constants.R_OK, err => {
    if (err) {
      console.error(err);
      return next();
    }

    try {
      console.info(`start compiling pug file: ${path.relative(cwd, pugPath)}`);
      const compiled = pug.compileFile(pugPath, opts)(
        Object.assign({}, opts.data, data)
      );
      console.info(`complete to compile pug: ${path.relative(cwd, pugPath)}`);

      fs.writeFileSync(data.outputFilePath, compiled);
    } catch (e) {
      return next(e);
    }

    return next();
  });
};

module.exports = pugMiddleware;
