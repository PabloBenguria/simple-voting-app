/*
* Dependencies
*/
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const ngAnnotate = require('gulp-ng-annotate');

/*
* Build css 
*/
gulp.task('css', function () {
  gulp.src('public/css/common/*.css')
  .pipe(concat('main.min.css'))
  .pipe(minifyCSS().on('error', function(error){
  	console.log(error);
  }))
  .pipe(gulp.dest('public/css/build/'))
});

/*
* Build common js dependencies
*/
gulp.task('commonjs', function () {
  gulp.src('public/js/common/*.js')
  .pipe(concat('common.min.js'))
  .pipe(uglify().on('error', function(error){
  	console.log(error);
  }))
  .pipe(gulp.dest('public/js/build/'))
});

/*
* Build angular components
*/
gulp.task('components', function () {
  gulp.src('public/components/**/*.js')
  .pipe(ngAnnotate())
  .pipe(concat('components.min.js'))
  .pipe(uglify().on('error', function(error){
  	console.log(error);
  }))
  .pipe(gulp.dest('public/js/build/'))
});