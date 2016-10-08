'use strict';

var gulp = require("gulp");
var del = require('del');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var less = require('gulp-less');
var concat = require("gulp-concat");
//var uglify = require("gulp-uglify");
var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;

gulp.task('electron', function(done) {
  // Start browser process
  var electron = spawn('electron', ['dist']);
  done();

  /*electron.stdout.on('data', (data) => {
    grep.stdin.write(data);
  });

  electron.stderr.on('data', (data) => {
    console.log(`ps stderr: ${data}`);
  });

  electron.on('close', (code) => {
    if (code !== 0) {
      console.log(`ps process exited with code ${code}`);
    }
    grep.stdin.end();
  });*/
});

gulp.task('reload', function() {
  // Reload Electron
  //electron.reload();
});

gulp.task('restart', function() {
  //electron.restart();
});

let appFiles = [
    'app/index.html',
    'app/templates/*.html',
    'app/css/*.less',
    'app/css/*.css',
    'app/**/*.js',
    'spec/*.js',
];

gulp.task("vendorjs", function() {
  return gulp.src([
    "node_modules/es6-promise/dist/es6-promise.js",
    "node_modules/jquery/dist/jquery.js",
    "node_modules/chance/dist/chance.min.js",
    "vendor/js/*.js",
    ])
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("javascript", function () {
  return gulp.src([
    "app/states/**/*.js",
    "app/app.js",
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"))
});

gulp.task("html", function() {
  return gulp.src([
    "app/index.html",
  ]).pipe(concat("index.html"))
    .pipe(gulp.dest("dist"))
});

gulp.task('copy_files', function() {
  return gulp.src([
    "app/assets/**/*",
    "main.js",
    "package.json",
    ])
    .pipe(gulp.dest("dist"))
});

gulp.task('copy_helpers', function() {
  return gulp.src([
    "spec/helpers/*.js",
    ])
    .pipe(gulp.dest("dist/spec/helpers"));
});

gulp.task('prep_fixtures', function() {
  return gulp.src([
    "app/templates/*.html",
    ])
    .pipe(gulp.dest("dist/spec/fixtures"));
});

gulp.task('clean', function() {
  return del([
    'dist/*',
  ]);
});

gulp.task('build', function(done) {
  runSequence(['vendorjs', 'javascript', "html", 'copy_files'], done);
});

gulp.task('rebuild', function(done) {
  runSequence('clean', 'build', 'reload', done);
});

gulp.task('default', function(done) {
  runSequence('clean', 'build', 'electron', done);
});
