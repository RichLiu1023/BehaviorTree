/**
 * Created by Rich
 */
var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('buildDMJS', function () {
    var tsResult = gulp.src(['src/**/*.ts'])
        .pipe(ts({
            target: "ES5",
            declaration: true,
            removeComments: true,//去除注释
            module: "system",
            sortOutput: "true",
            out: "bt.js"
        }));
    return [
        tsResult.js.pipe(gulp.dest('bin/bt')).pipe(rename({ suffix: '.min' })).pipe(uglify()).pipe(gulp.dest('bin/bt')),
        tsResult.dts.pipe(gulp.dest('bin/bt'))
    ];
});

gulp.task('default', ['buildDMJS']);