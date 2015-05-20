var path = require('path');

var appRoot = 'src/';
var intRoot = 'inter/';
var outputRoot = 'dist/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.jsx',
  html: appRoot + '**/*.html',
  style: 'styles/**/*.css',
  interSource: intRoot + '**/*.jsx',
  interHtml: intRoot + '**/*.html',
  inter: intRoot,
  output: outputRoot,
  sourceMapRelativePath: '../' + appRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};