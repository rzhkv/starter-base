import { logger } from '../config/logger.js';
import { plugins } from '../config/plugins.js';
import { paths } from '../config/paths.js';

import pkg from 'gulp';
const { src, dest, parallel, series, watch } = pkg;

import sassglob from 'gulp-sass-glob';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import groupMediaQueries from 'gulp-group-css-media-queries';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';

const sass = gulpSass(dartSass);

const styles = () => {
  return src(paths.input.scss)
    .pipe(logger.handleError('SCSS'))
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(sass({ outputStyle: 'expanded' }, null))
    .pipe(groupMediaQueries())
    .pipe(postcss([autoprefixer({ grid: 'autoplace' })]))
    .pipe(cleanCss())
    .pipe(sourcemaps.write(paths.cssOutput + './maps'))
    .pipe(dest(paths.output.css))
    .pipe(plugins.browserSync.stream());
};

export { styles };
