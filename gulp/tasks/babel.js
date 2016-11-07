import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';

import { sources, dest, beforeBabel } from '../config';

gulp.task('babel', beforeBabel, () =>
  gulp.src(sources)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(gulp.dest(dest)));
