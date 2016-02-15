var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var size = require('gulp-filesize');
var print = require('gulp-print');
var lib = require('bower-files')();
var del = require('del');
var cssnano = require('gulp-cssnano');

var jsPaths = ['./public/main/*.js','./public/main/**/*.js','./public/users/*.js','./public/users/**/*.js','./public/request_modal/*.js','./public/request_modal/**/*.js','./public/application.js'];


gulp.task('clean:js', function () {
  return del(['./public/js/build']);
});

gulp.task('styles', function() {
    gulp.src('./public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css/'))
        .pipe(size())
        .pipe(cssnano())
        .pipe(gulp.dest('./public/css/build/'))
        .pipe(size())
        .pipe(livereload());
});

gulp.task('lib', function () {
    gulp.src(lib.ext('js').files)
        .pipe(print())
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/build'))
        .pipe(size());
});

gulp.task('js', function () {
    gulp.src(jsPaths)
        .pipe(print())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/build'))
        .pipe(size());
    });


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(jsPaths, ['js']);
    gulp.watch(lib.ext('js').files, ['lib']);
    gulp.watch('./public/scss/**/*.scss',['styles']);
});

gulp.task('default',['clean:js', 'watch', 'lib', 'js', 'styles']);
