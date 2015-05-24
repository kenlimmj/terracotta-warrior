/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 12:27:17
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-24 13:48:39
 */

'use strict';

var babel = require('gulp-babel');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');


var INPUT_FILE_GLOB = 'src/*.js';
var OUTPUT_FILE_DIR = './dist';

gulp.task('build-clean', function(cb) {
  return del([OUTPUT_FILE_DIR + '/**/*'], cb);
});

gulp.task('build-scripts', function(cb) {
  return gulp.src(INPUT_FILE_GLOB)
    .pipe(plumber())
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(babel())
    .pipe(stripDebug())
    // .pipe(uglify())
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(OUTPUT_FILE_DIR))
});

gulp.task('build', function(callback) {
  runSequence('build-clean', 'build-scripts', callback);
});

gulp.task('test', function() {
  return gulp.src('tests/test.js', { read: false })
    .pipe(plumber())
    .pipe(mocha());
});
