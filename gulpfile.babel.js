import gulp from 'gulp';
import del from 'del';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import mocha from 'gulp-spawn-mocha';
import nodemon from 'gulp-nodemon';
import childProcess from 'child_process';

let node = null;
const { spawn } = childProcess;

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
  gulp.src('test/**/test-*.js', { read: false })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register',
    })));

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
  return gulp.watch([ 'src/**/*', 'config/**/*'],
      ['test', 'serve']);
});

gulp.task('default', ['start']);

process.on('exit', () => {
  if (node) {
    node.kill();
  }
});
