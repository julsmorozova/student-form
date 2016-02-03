var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var fileList = [
  './js/global.js', './js/student.js', './js/filter.js', './js/storage.js',
  './js/form-validator.js', './js/sort.js', './js/app.js'
];
var compiledDest = './compiled/';

gulp.task('compress', function() {
  return gulp.src(fileList)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(compiledDest))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch('js/**/*.js', ['compress'])
});
