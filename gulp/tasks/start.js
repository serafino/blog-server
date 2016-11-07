import gulp from 'gulp';
import childProcess from 'child_process';

let node = null;
const { spawn } = childProcess;

function startNode() {
  return spawn('node', ['dist/lib/index.js'],
    { stdio: 'inherit' });
}

gulp.task('serve', ['test'], () => {
  if (node) {
    node.kill();
  }

  node = startNode();  

  node.on('close', (code) => {
    if (code === 8) {
      console.log('Error detected. Awaiting changes...');
    }
  });
});

gulp.task('start', ['test'], () => {
  node = startNode();
  return gulp.watch(['src/**/*', 'config/**/*', 'test/**/*'],
      ['test', 'serve']);
});

process.on('exit', () => {
  if (node) {
    node.kill();
  }
});
