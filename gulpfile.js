'use strict';

// Globals
const gulp = require('gulp');
const rollupBuble = require('rollup-plugin-buble');
const rollupCommonjs = require("rollup-plugin-commonjs");
const betterRollup = require('gulp-better-rollup');
const jshint = require('gulp-jshint');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const size = require('gulp-size');
const stripComments = require('gulp-strip-comments');
const uglify = require('gulp-uglify');

const projectName = "slightly";

// Tasks
gulp.task('lint', function () {
  return gulp.src(['src/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', function () {
  return gulp.src('./src/wrapper.js')
    .pipe(plumber())
    .pipe(betterRollup({
      plugins: [
        rollupBuble({
          transforms: {
            dangerousForOf: true
          }
        }),
        rollupCommonjs()
      ]
    }, {
      moduleName: 'Slightly',
      format: 'umd',
    }))
    .pipe(stripComments())
    .pipe(rename(projectName + '.js'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['lint', 'build'], function () {
  return gulp.src(['./dist/' + projectName + '.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename(projectName + '.min.js'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(size({
      gzip: true,
      showFiles: true
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js'], ['minify']);
});

gulp.task('default', ['minify']);
