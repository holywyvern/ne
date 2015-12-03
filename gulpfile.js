var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var minify = require("gulp-minify");

var $SCRIPTS = [
  // Base script
  "src/ne.js",
  // Tools
  "src/tools.js",
  "src/tools/gl.js",
  "src/tools/Loader.js",
  // Geometry
  "src/geometry/Point.js",
  // Graphics
  "src/graphics/Color.js",
  "src/graphics/ShaderBase.js",
  "src/graphics/Shader.js",
  "src/graphics/Texture.js",
  "src/graphics/Pixmap.js",
  // Drawable objects
  "src/graphics/drawables/Drawable.js",
  "src/graphics/drawables/Container.js",
  "src/graphics/drawables/Sprite.js",
  // Shader collection
  "src/graphics/shaders/SpriteShader.js"
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
