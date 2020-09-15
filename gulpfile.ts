import * as gulp from "gulp";
import * as minify from "gulp-minify";

/*
 * Minify public/javascripts
 */

function publicJavascriptsMinFn () {

  return gulp.src("public-typescript/*.js", { allowEmpty: true })
    .pipe(minify({ noSource: true, ext: { min: ".min.js" } }))
    .pipe(gulp.dest('public/javascripts'))
}


gulp.task("public-javascript-min", publicJavascriptsMinFn)

/*
 * Watch
 */

function watchFn() {
  gulp.watch("public-typescript/*.js", publicJavascriptsMinFn);
}

gulp.task("watch", watchFn);

/*
 * Initialize default
 */

gulp.task("default",function() {
  publicJavascriptsMinFn();
  watchFn();
});
