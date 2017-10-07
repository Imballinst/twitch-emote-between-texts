// Webpack config
const fs = require('fs');
const del = require('del');
const path = require('path');

const buildPath = path.join(__dirname, '../../public');

let manifest;

del(`${buildPath}/*`).then((paths) => {
  console.log('info', 'Deleted files and folders:\n', paths.join('\n'));
});
