import { logger } from '../config/logger.js';
import { plugins } from '../config/plugins.js';
import { paths } from '../config/paths.js';

import pkg from 'gulp'
const { src, dest, parallel, series, watch } = pkg

import svgSprite from 'gulp-svg-sprite';

const createSvgSprite = () => {
  return src(paths.input.svgIcons)
    .pipe(logger.handleError('COPY ROOT FILES'))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
            example: true,
          },
        },
      }),
    )
    .pipe(dest(paths.output.svgIcons));
};

export { createSvgSprite };
