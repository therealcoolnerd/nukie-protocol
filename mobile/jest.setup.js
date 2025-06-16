const { Buffer } = require('buffer');
global.Buffer = Buffer;

const path = require('path');
const Module = require('module');
const extraPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../node_modules'),
];
process.env.NODE_PATH = extraPaths.join(path.delimiter);
Module.Module._initPaths();
extraPaths.forEach((p) => {
  if (!Module.Module.globalPaths.includes(p)) {
    Module.Module.globalPaths.push(p);
  }
});

global.__DEV__ = true;
