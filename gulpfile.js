// add image min to the project
// Import modules
// general
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

// css
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

// js
// const babel = require('babel-core');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// compile scss into css
function style() {
  // 1. Where is scss file?
  return (
    gulp
      .src('scss/**/*.scss')
      .pipe(sourcemaps.init())
      // 2. Compile sass file
      .pipe(sass())
      .on('error', sass.logError)
      // 3. Add prefixes to code
      .pipe(postcss([autoprefixer]))
      // Minify the CSS
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      // 4. Where do I save the complied CSS?
      .pipe(gulp.dest('app/css/'))
      // 5. Stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

function javascript(done) {
  const jsFolder = './javascript/';
  const index = 'index.js';
  const jsDIST = './app/javascript/';
  const jsFILES = [index];

  jsFILES.map(function(entry) {
    return browserify({
      entries: [jsFolder + entry],
      debug: true
    })
      .transform(babelify, {
        presets: ['@babel/env'],
        sourceMaps: true
      })
      .bundle()
      .pipe(source(entry))
      .pipe(rename({ extname: '.min.js' }))

      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify({ compress: false }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(jsDIST));
  });
  done();
}

// watcher
function watch() {
  // specify server to run
  browserSync.init({
    server: {
      // server directory
      baseDir: './app'
    }
  });

  // Watch for any changes on scss files
  // run style task to complie any changes
  gulp.watch('scss/**/*.scss', style);

  // Watch for any changes in index files, reload browser on those changes
  gulp.watch('./app/*.html').on('change', browserSync.reload);

  // Watch for pre-javaScript changes, apply changes to the files on save
  gulp
    .watch('./javascript/**/*.js', javascript)
    .on('change', browserSync.reload);
}

// export tasks
exports.style = style;
exports.javascript = javascript;
exports.watch = watch;
