gulp.task('copy', ['clean'], () =>
  gulp.src('config/**/*')
    .pipe(gulp.dest('dist/config/')));
