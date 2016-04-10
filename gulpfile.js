//dependencies
var gulp = require('gulp');
var util = require('gulp-util');
var SystemBuilder = require('systemjs-builder');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var tsConfig = require('./tsconfig.json');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//Typescript Config;
var tsProject = ts.createProject(tsConfig.compilerOptions);

//copy dependencies to dist folder
gulp.task('copy:deps', function(){
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/http.js',
        'node_modules/angular2/bundles/router.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/systemjs/dist/system.js.map'
    ]).pipe(gulp.dest('dist/vendor'));
});

//copy html/css/js files
gulp.task('copy:src', function(){
    return gulp.src([
            'src/index.html',
            'src/**/*.html',
            'src/**/*.css'
        ])
        .pipe(gulp.dest('dist'));
});

//sass
gulp.task('sass', function () {
    return gulp.src(['./src/**/*.scss'])
        .pipe(sass({
            includePaths: ['src/sass/']
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

//clean the dist folder
gulp.task('clean', function(cb) {
    return gulp.src('./dist', { read: false }) // much faster
        .pipe(rimraf(cb));
})

// add ts source
tsConfig.files.push('src/**/*.ts');

//compile app typescript files
gulp.task('compile:app', function(){
    return gulp.src(tsConfig.files)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

//live reload server
gulp.task('build', ['copy:deps', 'copy:src', 'sass', 'compile:app']);

//default task
gulp.task('watch', ['build'], function(){
    gulp.watch(['src/**/*.ts'], ['compile:app']);
    gulp.watch(['src/**/*.js', 'src/**/*.html', 'src/**/*.css'], ['copy:src']);
    gulp.watch(['src/**/*.scss'], ['sass']);
});
