import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';

gulp.task('babel', ['copy'], () =>
  gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(gulp.dest('dist/')));
