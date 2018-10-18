var gulp = require('gulp')
var nunjucksRender = require('gulp-nunjucks-render')
var del = require('del')
var browserSync = require('browser-sync').create()

gulp.task('clean', () => {
  return del([
    'app/pages',
    'app/index.html'
  ])
})

gulp.task('cleanVendor', () => {
  return del([
    'app/vendor'
  ])
})
 
gulp.task('nunjucks', ['clean'], () => {
  // Gets .html and .nunjucks files in pages
  return gulp.src([
    'app/views/**/*.+(html|nunjucks)',
    '!app/views/layouts/**/*.+(html|nunjucks)',
    '!app/views/partials/**/*.+(html|nunjucks)'
  ])
  // Renders template with nunjucks
  .pipe(nunjucksRender({
    path: ['app/views']
  }))
  // output files in app folder
  .pipe(gulp.dest('app'))
})

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', ['cleanVendor'], () => {
  // Bootstrap CSS
  gulp.src([
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
  ])
    .pipe(gulp.dest('app/vendor/bootstrap/css'))

    // Bootstrap JS
    gulp.src([
      './bower_components/bootstrap/dist/js/bootstrap.bundle.min.js'
    ])
      .pipe(gulp.dest('app/vendor/bootstrap/js'))
 
  // jQuery
  gulp.src([
    './bower_components/jquery/dist/jquery.min.js'
  ])
    .pipe(gulp.dest('app/vendor/jquery'))
 
  // Web3
  gulp.src([
    './bower_components/web3/dist/web3.min.js'
  ])
    .pipe(gulp.dest('app/vendor/web3'))
 
  // jQuey Validation
  gulp.src([
    './bower_components/jquery-validation/dist/jquery.validate.min.js'
  ])
    .pipe(gulp.dest('app/vendor/jquery-validation'))
 
  // Font Awesome
  gulp.src([
    './bower_components/Font-Awesome/svg-with-js/js/fontawesome-all.min.js'
  ])
    .pipe(gulp.dest('app/vendor/font-awesome'))

  // Moment
  gulp.src([
    './bower_components/moment/min/moment-with-locales.min.js'
  ])
    .pipe(gulp.dest('app/vendor/moment'))

  // Clipboard
  gulp.src([
    './bower_components/clipboard/dist/clipboard.min.js'
  ])
    .pipe(gulp.dest('app/vendor/clipboard/'))
})

// Default task
gulp.task('default', ['nunjucks', 'vendor'])
 
// Configure the browserSync task
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app',
      main: 'index.html',
      directory: false
    }
  })
})
 
// Dev task
gulp.task('dev', ['nunjucks', 'browserSync'], () => {
  gulp.watch('app/styles/*.css', browserSync.reload)
  gulp.watch('app/scripts/*.js', browserSync.reload)
  gulp.watch('app/*.html', browserSync.reload)
  gulp.watch('app/**/*.html', browserSync.reload)
  gulp.watch('app/**/*.nunjucks', ['clean', 'nunjucks', browserSync.reload])
})
