import gulp from 'gulp';
import mocha from 'gulp-spawn-mocha';

import { mochaConfig, tests, beforeTest } from '../config';

gulp.task('test', beforeTest, done =>
  gulp.src(tests, { read: false })
    .pipe(mocha(mochaConfig))
    .on('error', () => done()));
