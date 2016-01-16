var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');


gulp.task('styles', function() {
    gulp.src('./public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css/'))
        .pipe(livereload());
});

//Watch task for changes
gulp.task('default',function() {
		livereload.listen();
		//watch this, [do this]
    gulp.watch('./public/scss/**/*.scss',['styles']);
});

gulp.task('js', function() {
	return gulp.src('.')
	})