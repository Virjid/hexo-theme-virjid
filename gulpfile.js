const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');

var config = {
    cssDirs: ['global','index'],
    jsDirs: []
};

gulp.task('sass-build', async() => {
    config.cssDirs.forEach((value, index)=>{
        gulp.src(`dev/scss/${value}/**/*.scss`)
            .pipe(concat('style.css'))
            .pipe(sass())
            .pipe(cleanCss())
            .pipe(gulp.dest(`source/css/${value}`));
    });
});

gulp.task('es6-build', async() => {
    config.jsDirs.forEach((value, index)=>{
        gulp.src(`dev/es6/${value}/**/*.js`)
            .pipe(babel())
            .pipe(uglify())
            .pipe(gulp.dest(`source/js/${value}`));
    });
    
});

gulp.task('build', gulp.series(gulp.parallel('sass-build', 'es6-build')));