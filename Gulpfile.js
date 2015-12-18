var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');


gulp.task('styles', function() {
    gulp.src('./public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css/'))
        .pipe(livereload());
});

//Watch task for changes
gulp.task('default',function() {
		//watch this, [do this]
		livereload.listen();
    gulp.watch('./public/scss/**/*.scss',['styles']);
});