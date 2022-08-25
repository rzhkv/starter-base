// Base
const fileswatch = 'html,htm,txt,json,md,woff2';

// Path to template
const path = 'src/tools/main';

// Path to current page
// Monitoring a specific folder
const domain = 'src/lp/main';

// Import gulp package

import pkg from 'gulp';

const { gulp, src, dest, parallel, series, watch } = pkg;

// Import dependencies

import browserSync from 'browser-sync';

import gulpSass from 'gulp-sass';

import dartSass from 'sass';

import sassglob from 'gulp-sass-glob';

const sass = gulpSass(dartSass);

import postCss from 'gulp-postcss';

import cssnano from 'cssnano';

import autoprefixer from 'autoprefixer';

import imagemin from 'gulp-imagemin';

import changed from 'gulp-changed';

import gnotify from 'gulp-notify';

function browsersync() {
  browserSync.init({
    // Uncomment if u use docker
    // proxy: "localhost:8000", // Docker nginx uri

    // Comment if u use docker
    server: {
      baseDir: 'src/',
    },
    ghostMode: false,
    notify: true,
    online: true,
  });
}

function styles() {
  return src([path + `/scss/index.scss`])
    .pipe(eval(sassglob)())
    .pipe(
      eval(sass)().on(
        'error',
        gnotify.onError({
          message: '<%= error.message %>',
          title: 'SCSS Error!',
        }),
      ),
    )
    .pipe(
      postCss([
        autoprefixer({ grid: 'autoplace' }),
        cssnano({
          preset: ['default', { discardComments: { removeAll: true } }],
        }),
      ]),
    )
    .pipe(dest(path + '/css'))
    .pipe(browserSync.stream());
}

function images() {
  return src([path + '/img/**/*'])
    .pipe(changed(path + '/image'))
    .pipe(imagemin())
    .pipe(dest(path + '/image'))
    .pipe(browserSync.stream());
}

function startwatch() {
  watch(path + `/scss/**/*`, { usePolling: true }, styles);
  watch(path + '/img/**/*.{jpg,jpeg,png,webp,svg,gif}', { usePolling: true }, images);
  watch(path + `/**/*.{${fileswatch}}`, { usePolling: true }).on('change', browserSync.reload);

  watch(domain + `/**/*`, { usePolling: true }).on('change', browserSync.reload);
}

export { styles, images };

export default series(styles, images, parallel(browsersync, startwatch));
