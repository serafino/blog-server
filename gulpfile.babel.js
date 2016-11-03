const gulp = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const spawn = require('child_process').spawn;

let node = null;

function startNode() {
  return spawn('node', ['dist/lib/index.js'],
    { stdio: 'inherit' });
}

gulp.task('clean', () => del('dist/'));

gulp.task('copy', ['clean'], () =>
  gulp.src('config/**/*')
    .pipe(gulp.dest('dist/config/')));

gulp.task('es6', ['copy'], () =>
  gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(gulp.dest('dist/')));

gulp.task('test', ['es6'], () =>
  gulp.src('test/**/test-*.js')
    .pipe(mocha({ reporter: 'spec' })));

gulp.task('serve', ['test'], () => {
  if (node) {
    node.kill();
  }

  node = startNode();  

  node.on('close', (code) => {
    if (code === 8) {
      console.log('Error detected. Awaiting changes...');
    }
  });
});

gulp.task('start', ['test'], () => {
  node = startNode();
  return gulp.watch([
    'test/**/*',
    'src/**/*',
    'config/**/*',
  ], [
    'test',
    'serve',
  ]);
});

gulp.task('default', ['start']);

process.on('exit', () => {
  if (node) {
    node.kill();
  }
});
