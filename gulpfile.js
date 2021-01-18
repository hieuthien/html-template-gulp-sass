var gulp = require('gulp')
var injectPartials = require('gulp-inject-partials')
var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var flexibility = require('postcss-flexibility')
var flexBugsFixes = require('postcss-flexbugs-fixes')
var cleanCSS = require('gulp-clean-css')
var minify = require('gulp-minify')
var watch = require('gulp-watch')
var clean = require('gulp-clean')
var autoprefixer = require('gulp-autoprefixer')
var purge = require('gulp-css-purge')
var livereload = require('gulp-livereload')
var connect = require('gulp-connect')
var rename = require('gulp-rename')

gulp.task('connect', function() {
    connect.server({
        root: './dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('clean', function () {
    return gulp
        .src('./dist', {
            allowEmpty: true
        })
        .pipe(clean());
})

gulp.task('copy-static', function () {
  return gulp
    .src(['./src/**/*', '!./src/scss/**/*', '!./src/html/**/*', '!./src/*.html'], { nodir: true })
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch:copy-static', function () {
  return gulp.watch(['./src/**/*', '!./src/scss/**/*', '!./src/html/**/*', '!./src/*.html'], gulp.series('copy-static'));
});

gulp.task('scss', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
          'last 30 versions',
          'iOS >= 8',
          'Safari >= 8',
          'Android >= 4'
      ],
      cascade: true
    }))
    .pipe(gulp.dest('./dist/css'))
})
gulp.task('scss:minify', function () {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                'last 30 versions',
                'iOS >= 8',
                'Safari >= 8',
                'Android >= 4'
            ],
            cascade: true
        }))
        .pipe(postcss([flexibility, flexBugsFixes]))
        .pipe(cleanCSS())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('html', function () {
  return gulp
    .src('./src/*.html')
    .pipe(
      injectPartials({
        start: '<Inject src="{{path}}">',
        end: '</Inject>',
        removeTags: true
      })
    )
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch:html', function () {
  return gulp.watch('src/**/*.html', gulp.series('html'))
})

gulp.task('watch:scss', function () {
  return gulp.watch('src/scss/**/*.scss', gulp.series(['scss', 'scss:minify']))
})

gulp.task('build', gulp.series('clean','copy-static', 'html', ['scss', 'scss:minify']))

gulp.task('default', gulp.series('clean', 'copy-static', 'html', ['scss', 'scss:minify'], gulp.parallel('watch:html', 'watch:scss', 'watch:copy-static')))
