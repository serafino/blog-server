import gulp from 'gulp';
import mocha from 'gulp-spawn-mocha';

import { mochaConfig, tests, beforeTest } from '../config';

gulp.task('test', beforeTest, () =>
  gulp.src(tests, { read: false })
    .pipe(mocha(mochaConfig)));
