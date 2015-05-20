var gulp = require('gulp');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var preprocess = require('gulp-preprocess');
var paths = require('../paths');
var args = require('../args');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('pre-system', function (callback) {
  if (!args.dev) {
    return runSequence('pre-process-system', callback);
  } else {
    return runSequence('pre-copy-system', callback);
  }
});

gulp.task('pre-process-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(preprocess({
      extension: 'js'
    }))
    .pipe(gulp.dest(paths.inter));
});

gulp.task('pre-copy-system', function () {
  return gulp.src(paths.source)
    .pipe(gulp.dest(paths.inter));
});

// copies changed html files to the output directory
gulp.task('pre-html', function (callback) {
  if (!args.dev) {
    return runSequence('pre-process-html', callback);
  } else {
    return runSequence('pre-copy-html', callback);
  }
});

gulp.task('pre-process-html', function () {
  return gulp.src(paths.html)
    .pipe(preprocess())
    .pipe(gulp.dest(paths.inter));
});

gulp.task('pre-copy-html', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.inter));
});