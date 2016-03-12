const gulp = require('gulp');
const babel = require('gulp-babel');
const rimraf = require('rimraf');
const eslint = require('gulp-eslint');

const scripts = ['src/**/*.js'];
const tests = ['test/**/*.js'];
const allScripts = scripts.concat(tests);

gulp.task('lint', function () {
  return gulp.src(allScripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', ['clean', 'lint'], function () {
  return gulp.src(scripts)
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function (cb) {
  rimraf('./dist', cb);
});


gulp.task('default', ['build']);
