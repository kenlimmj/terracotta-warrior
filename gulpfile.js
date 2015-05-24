/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 12:27:17
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-24 10:46:54
 */

'use strict';

var assign = require('lodash/object/assign');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var chalk = require('chalk');
var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');

var ENTRY_POINT = 'src/main.js';
var OUTPUT_FILE_NAME = 'tw.js';
var OUTPUT_FILE_DIR = './dist';

// Browserify options
var browserifyOpts = {
  entries: ENTRY_POINT,
  debug: true,
  transform: [babelify]
}

var opts = assign({}, watchify.args, browserifyOpts);

// Initialize file watcher
var watcher = watchify(browserify(opts));

// Compiles the files and assets pointed to by the entry point
var bundle = function() {
  // Print fancy output to the console. This is styled to match the
  // default Gulp console output.
  var currentTime = chalk.black(new Date().toLocaleTimeString('en-GB'));
  var currentTask = chalk.cyan('Browserify');
  console.log('[' + currentTime + '] Running \'' + currentTask + '\'...');

  // Run transformations
  return watcher
    .bundle()
    .pipe(plumber())
    .pipe(source(OUTPUT_FILE_NAME))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(OUTPUT_FILE_DIR));
}

// Hook into the default gulp task so we can run `gulp` to start watching
gulp.task('default', bundle);

// Watch for file changes as a long-running process
watcher.on('update', bundle);