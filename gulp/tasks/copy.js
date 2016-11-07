import gulp from 'gulp';

import {
  configFolder,
  configDestination,
  beforeCopy } from '../config';

gulp.task('copy', beforeCopy, () =>
  gulp.src(configFolder)
    .pipe(gulp.dest(configDestination)));
