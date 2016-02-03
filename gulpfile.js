var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var fileList = [
  './js/global.js', './js/student.js', './js/filter.js', './js/storage.js',
  './js/form-validator.js', './js/sort.js', './js/app.js'
];
var jsDest = './compiled/js';
var cssDest = './compiled/css';
var fontsDest = './compiled/fonts';

gulp.task('compress', function() {
  return gulp.src(fileList)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task('css', function() {
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(autoprefixer('last 2 version'))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(cssDest))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('fonts', function() {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest(fontsDest));
});

// Watch
gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['css']);
  gulp.watch('js/*.js', ['compress']);

  // Create LiveReload server
  livereload.listen();
  gulp.watch(['compiled/**']).on('change', livereload.changed);

});
