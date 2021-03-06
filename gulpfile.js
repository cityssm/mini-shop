"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const minify = require("gulp-minify");
const publicJavascriptsMinFn = () => {
    return gulp.src("public-typescript/*.js", { allowEmpty: true })
        .pipe(minify({ noSource: true, ext: { min: ".min.js" } }))
        .pipe(gulp.dest("public/javascripts"));
};
gulp.task("public-javascript-min", publicJavascriptsMinFn);
const watchFn = () => {
    gulp.watch("public-typescript/*.js", publicJavascriptsMinFn);
};
gulp.task("watch", watchFn);
gulp.task("default", () => {
    publicJavascriptsMinFn();
    watchFn();
});
