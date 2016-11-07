export const configDestination = 'dist/config/**/*';
export const configFolder = 'config/**/*';
export const dest = 'dist/';
export const entryPoint = 'dist/lib/index.js';
export const sources = 'src/**/*.js';
export const testFolder = 'test/**/*';
export const tests = 'test/**/test-*.js';

export const beforeClean = [];
export const beforeCopy = ['clean'];
export const beforeBabel = ['copy'];
export const beforeLintTests = ['babel'];
export const beforeTest = ['lint-tests'];
export const beforeServe = ['test'];
export const beforeStart = ['test'];

export const mochaConfig = {
  reporter: 'spec',
  compilers: 'js:babel-core/register',
  env: { 'NODE_ENV': 'test' },
};
