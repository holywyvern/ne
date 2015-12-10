var gulp       = require('gulp');
var ts         = require('gulp-typescript');
var minify     = require('gulp-minify');
var merge      = require('merge2');
var sourcemaps = require('gulp-sourcemaps');
var concat     = require('gulp-concat');

gulp.task('typescript', function () {
  var tsProject = ts.createProject('./src/tsconfig.json');
  var tsResult = tsProject.src() // instead of gulp.src(...)
    .pipe(sourcemaps.init())
		.pipe(ts(tsProject));
  return merge([
    tsResult.dts.pipe(gulp.dest('build')),
    tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('build'))
  ]);
});

gulp.task('join', ['typescript'], function () {
  gulp.src(['./build/ne.js', './node_modules/opentype.js/dist/opentype.js'])
    .pipe(concat('ne.js'))
    .pipe(gulp.dest('dist'));
})

gulp.task('watch', function () {
  gulp.watch(tsProject.src(), ['typescript', 'join']);
})

gulp.task('default', ['join'], function () {

})
