import { plugins } from '../config/plugins.js';
import { paths } from '../config/paths.js';

import pkg from 'gulp';
const { src, dest, parallel, series, watch } = pkg;

const server = () => {
  plugins.connectPHP.server(
    {
      base: paths.inputPath,
    },
    () => {
      plugins.browserSync.init({
        proxy: '127.0.0.1:8000',
        logLevel: 'info',
        port: 3000,

        ghostMode: false,
        cors: true,
        notify: true,
        online: true,
      });
    },
  );

  watch(paths.watchers.files).on('change', function () {
    plugins.browserSync.reload();
  });
};

export { server };
