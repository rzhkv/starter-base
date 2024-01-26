import { logger } from '../config/logger.js';
import { plugins } from '../config/plugins.js';
import { paths } from '../config/paths.js';

import pkg from 'gulp';
const { src, dest, parallel, series, watch } = pkg;

import imageMin from 'gulp-imagemin';

const images = () => {
  return src(paths.input.images)
    .pipe(logger.handleError('IMAGES'))
    .pipe(plugins.changed(paths.input.images))
    .pipe(
      imageMin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 4,
      }),
    )
    .pipe(dest(paths.output.images))
    .pipe(plugins.browserSync.stream());
};

export { images };
