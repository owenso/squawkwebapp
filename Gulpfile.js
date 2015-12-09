var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('./public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

//Watch task for changes
gulp.task('default',function() {
		//watch this, [do this]
    gulp.watch('./public/scss/**/*.scss',['styles']);
});