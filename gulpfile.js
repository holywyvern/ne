var gulp       = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel      = require("gulp-babel");
var concat     = require("gulp-concat");
var minify     = require("gulp-minify");
var remember   = require('gulp-remember');
var cached     = require('gulp-cached');

var $SCRIPTS = [
  // Polyfill
  "src/polyfill.js",
  // Base script
  "src/ne.js",
  // Tools
  "src/tools.js",
  "src/tools/gl.js",
  "src/tools/Loader.js",
  "src/tools/escalars.js",
  // Geometry
  "src/geometry/Vec2.js",
  "src/geometry/Vec3.js",
  "src/geometry/Vec4.js",
  "src/geometry/Point.js",
  "src/geometry/RectBase.js",
  "src/geometry/Rect.js",
  // General classes
  "src/EventManager.js",
  "src/SceneManager.js",
  "src/Game.js",
  // Graphics
  "src/graphics/ColorBase.js",
  "src/graphics/Color.js",
  "src/graphics/ShaderBase.js",
  "src/graphics/Shader.js",
  "src/graphics/Texture.js",
  "src/graphics/Pixmap.js",
  // Renderers
  "src/graphics/Renderer.js",
  "src/graphics/WebGLRenderer.js",
  "src/graphics/Canvas2DRenderer.js",
  // Drawable objects
  "src/graphics/drawables/Drawable.js",
  "src/graphics/drawables/Actor.js",
  "src/graphics/drawables/Container.js",
  "src/graphics/drawables/Sprite.js",
  "src/graphics/drawables/Scene.js",
  // Shader collection
  "src/graphics/shaders/SpriteShader.js",
  "src/graphics/shaders/SceneShader.js"
];

gulp.task("compile", function () {
  return gulp.src($SCRIPTS)
    .pipe(cached('babel-precompiled'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(remember('babel-precompiled'))
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

gulp.task('watch', function(){
  gulp.watch('src/**/*.js', ['compile', 'default']);
});
