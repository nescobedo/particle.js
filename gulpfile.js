'use strict';

// =============================================================================
// Plugins
// =============================================================================

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  notify = require('gulp-notify'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  babel = require('gulp-babel');

const paths = {
  html: 'public/**/*.html',
  js: 'src/js/**/*.js',
  sass: 'src/sass/**/*.scss',
};

// ============================================================================
// Tasks
// =============================================================================

// // Delete css/js
gulp.task('clean', function () {
  return del(['public/css/**/*', 'public/js/**/*']);
});

// // Compile Our Sass
gulp.task('Sass', function () {
  return gulp
    .src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/css/'))
    .pipe(notify({ message: 'SASSed!!' }))
    .pipe(reload({ stream: true }));
});

// // Minify CSS
gulp.task(
  'minSass',
  gulp.series('Sass', function () {
    return gulp
      .src('public/css/main.css')
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('public/css/'))
      .pipe(notify({ message: 'CSS MINIFIED!' }));
  })
);

// Concatenate JS
gulp.task('concatScripts', function () {
  return gulp
    .src(['src/js/bootstrap.js', 'src/js/custom.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'))
    .pipe(reload({ stream: true }));
});

// // //Minify JS
gulp.task(
  'minScripts',
  gulp.series(['concatScripts'], function () {
    return gulp
      .src('public/js/main.js')
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest('public/js/'));
  })
);

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  });
  gulp
    .watch(paths.js, gulp.series('minScripts'))
    .on('change', browserSync.reload);
  gulp.watch(paths.html).on('change', browserSync.reload);
  gulp
    .watch(paths.sass, gulp.series('minSass'))
    .on('change', browserSync.reload);
});

// Default Task
gulp.task('default', gulp.series('clean', 'minSass', 'minScripts', 'watch'));
