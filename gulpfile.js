/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 12:27:17
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-23 21:52:55
 */

'use strict';

var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');

var opts = {
  entries: 'src/main.js',
  debug: true,
  cache: {},
  packageCache: {},
  transform: [babelify]
}

var watcher = watchify(browserify(opts));

var bundle = function () {
  console.log('[' + new Date().toLocaleTimeString('en-GB') + '] Compiling...');

  return watcher
    .bundle()
    .pipe(source('tw.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}

gulp.task('default', bundle);
watcher.on('update', bundle);