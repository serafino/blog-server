import gulp from 'gulp';
import mocha from 'gulp-spawn-mocha';

gulp.task('test', ['lint-tests'], () =>
  gulp.src('test/**/test-*.js', { read: false })
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register',
      env: { 'NODE_ENV': 'test' },
    })));

gulp.task('build', ['test']);
