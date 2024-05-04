const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

gulp.task("sass", function () {
  return gulp.src("sass/*.scss").pipe(sass()).pipe(gulp.dest("assets"));
});

gulp.task("watch", function () {
  gulp.watch("sass/**/*.scss", gulp.series("sass"));
});
