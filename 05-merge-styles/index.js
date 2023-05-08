const fs = require('fs');
const path = require('path');

const oldFolder = './05-merge-styles';
const newFolder = './05-merge-styles';
const oldDirectoty = 'styles';
const bundle = 'bundle.css';

async function buildStyles(old, now, oldFold, newFold) {
  const dirPath = path.join(oldFold, old);
  const files = await fs.promises.readdir(dirPath);
  const contents = [];

  for (const file of files) {
    if (path.extname(file) === '.css') {
      const content = await fs.promises.readFile(path.join(dirPath, file), 'utf-8');
      contents.push(content);
    }
  }

  const result = contents.join('\n');
  const newPath = path.join(newFold, now);

  await fs.promises.writeFile(newPath, result);
}

if (module.parent) {
  module.exports = buildStyles;
} else {
  buildStyles(oldDirectoty, bundle, oldFolder, newFolder)
  .then(() => console.log('bundle Ok!'))
  .catch((err) => console.error(err));
}