const fileswatch = 'html,htm,txt,json,md,woff2,php';

const inputPath = 'src';
const template = 'main';

const paths = {
  inputPath: inputPath,
  template: template,

  input: {
    scss: `${inputPath}/tools/${template}/scss/index.scss`,
    images: `${inputPath}/tools/${template}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svgIcons: `${inputPath}/tools/${template}/icons/*.svg`,
  },

  output: {
    css: `${inputPath}/tools/${template}/css`,
    images: `${inputPath}/tools/${template}/images`,
    svgIcons: `${inputPath}/tools/${template}/sprite`,
  },

  watchers: {
    files: `${inputPath}/**/*.php`,
    scss: `${inputPath}/tools/${template}/scss/**/*.scss`,
    images: `${inputPath}/tools/${template}/img/*.{jpg,jpeg,png,gif,webp}`,
  },
};

export { paths };
