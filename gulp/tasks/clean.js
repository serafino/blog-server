import gulp from 'gulp';
import del from 'del';

import { dest, beforeClean } from '../config';

gulp.task('clean', beforeClean, () => del(dest));
