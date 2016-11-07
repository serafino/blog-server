import gulp from 'gulp';
import childProcess from 'child_process';

import {
  sources,
  entryPoint,
  beforeStart,
  beforeServe,
  tests,
  configFolder,
  testFolder } from '../config';

let node = null;
const { spawn } = childProcess;

function startNode() {
  return spawn('node', [entryPoint],
    { stdio: 'inherit' });
}

gulp.task('serve', beforeServe, () => {
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

gulp.task('start', beforeStart, () => {
  node = startNode();
  return gulp.watch([sources, configFolder, testFolder],
      ['serve']);
});

process.on('exit', () => {
  if (node) {
    node.kill();
  }
});
