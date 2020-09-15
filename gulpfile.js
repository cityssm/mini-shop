"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const minify = require("gulp-minify");
function publicJavascriptsMinFn() {
    return gulp.src("public-typescript/*.js", { allowEmpty: true })
        .pipe(minify({ noSource: true, ext: { min: ".min.js" } }))
        .pipe(gulp.dest('public/javascripts'));
}
gulp.task("public-javascript-min", publicJavascriptsMinFn);
function watchFn() {
    gulp.watch("public-typescript/*.js", publicJavascriptsMinFn);
}
gulp.task("watch", watchFn);
gulp.task("default", function () {
    publicJavascriptsMinFn();
    watchFn();
});
