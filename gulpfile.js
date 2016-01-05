var gulp = require('gulp');
var react = require('gulp-react');
var notify = require('gulp-notify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

gulp.task('default', function () {
	return gulp.src('./src/js/*.jsx')
    .pipe(watch("src/js/*.jsx"))
		.pipe(react())
		.pipe(gulp.dest('build'))
    .pipe(notify("Gulp completed!"));
});

gulp.task('sass', function () {
  gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
