const gulp = require('gulp')
const concat = require('gulp-concat')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const brotli = require('gulp-brotli')
const gzip = require('gulp-gzip')


gulp.task('dev-css',
  () => {
    return gulp.src('src/css/styles.css')
      .pipe(gulp.dest('server/static/css'))
  }
)

gulp.task('dev-js',
  () => {
    return gulp.src('src/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(babel({presets: ['@babel/env']}))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('server/static/js'))
    }
)

gulp.task('css',
  () => {
    const plugins = [cssnano()]
    return gulp.src('src/css/styles.css')
      .pipe(postcss(plugins))
      .pipe(gulp.dest('server/static/css'))
  }
)
// styles.min.css

gulp.task('js',
  () => {
    return gulp.src('src/js/*.js')
      .pipe(concat('main.min.js'))
      .pipe(babel({presets: ['@babel/env']}))
      .pipe(uglify())
      .pipe(gulp.dest('server/static/js'))
    }
)

gulp.task('brotli-js',
  () => {
    return gulp.src('server/static/js/*.js')
      .pipe(brotli.compress({
        extension: 'brotli',
        skipLarger: true,
        mode: 0,
        quality: 11,
        lgblock: 0
      }))
      .pipe(gulp.dest('server/static/js'))
  }
)
gulp.task('brotli-css',
  () => {
    return gulp.src('server/static/css/*.css')
      .pipe(brotli.compress({
        extension: 'brotli',
        skipLarger: true,
        mode: 0,
        quality: 11,
        lgblock: 0
      }))
      .pipe(gulp.dest('server/static/css'))
  }
)

gulp.task('gzip-js',
  () => {
    return gulp.src('server/static/js/*.js')
      .pipe(gzip())
      .pipe(gulp.dest('server/static/js'))
  }
)

gulp.task('gzip-css',
  () => {
    return gulp.src('server/static/css/*.css')
      .pipe(gzip())
      .pipe(gulp.dest('server/static/css'))
  }
)
