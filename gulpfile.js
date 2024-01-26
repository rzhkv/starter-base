import pkg from 'gulp';

import { paths } from './gulp/config/paths.js';

const { src, dest, parallel, series, watch } = pkg;

import { server } from './gulp/tasks/server.js';
import { styles } from './gulp/tasks/styles.js';
import { images } from './gulp/tasks/images.js';
import { createSvgSprite } from './gulp/tasks/createSvgSprite.js';

function watcher() {
  watch(paths.watchers.scss, styles);
  watch(paths.watchers.images, images);
}

// const dev = series(styles, images, parallel(watcher, server));

export { server, styles, images, createSvgSprite };

export let assets = series(styles, images, createSvgSprite);

export default series(styles, images, createSvgSprite, parallel(server, watcher));
