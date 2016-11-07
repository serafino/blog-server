import gulp from 'gulp';
import eslint from 'gulp-eslint';

import { tests, beforeLintTests } from '../config';

gulp.task('lint-tests', beforeLintTests, () => 
  gulp.src(tests)
    .pipe(eslint())
    .pipe(eslint.format()));
