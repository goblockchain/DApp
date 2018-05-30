var gulp = require('gulp');
var util = require('gulp-util');
var browserSync = require('browser-sync').create();

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './bower_components/bootstrap/dist/**/*',
      '!./bower_components/bootstrap/dist/css/bootstrap-grid*',
      '!./bower_components/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('app/vendor/bootstrap'))

  // jQuery
  gulp.src([
      './bower_components/jquery/dist/*',
      '!./bower_components/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('app/vendor/jquery'))

  // jQuery
  gulp.src([
    './bower_components/web3/dist/*',
    '!./bower_components/web3/dist/web3.min.js'
  ])
  .pipe(gulp.dest('app/vendor/web3'))

})

// Default task
gulp.task('default', ['vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app',
      directory: true
    }
  });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('app/styles/*.css', browserSync.reload);
  gulp.watch('app/scripts/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
});
