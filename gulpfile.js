var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var minify = require("gulp-minify");

var $SCRIPTS = [
  "src/ne.js",
  "src/tools.js",
  "src/tools/gl.js",
  "src/tools/Loader.js",
  "src/graphics/Color.js",
  "src/graphics/Shader.js",
  "src/graphics/Texture.js",
  "src/graphics/Pixmap.js",
  "src/graphics/Drawable.js",
  "src/graphics/Container.js"
];

gulp.task("compile", function () {
  return gulp.src($SCRIPTS)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("ne.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
})

gulp.task("default", ["compile"], function () {
  return gulp.src($SCRIPTS)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("ne.js"))
    .pipe(minify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
