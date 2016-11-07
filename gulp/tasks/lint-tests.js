import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint-tests', ['babel'], () => 
  gulp.src('test/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format()));
