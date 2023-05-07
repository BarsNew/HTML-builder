const fs = require('fs');
const path = require('path');

async function buildStyles() {
  const dirPath = path.join(__dirname, 'styles');
  const files = await fs.promises.readdir(dirPath);
  const contents = [];

  for (const file of files) {
    if (path.extname(file) === '.css') {
      const content = await fs.promises.readFile(path.join(dirPath, file), 'utf-8');
      contents.push(content);
    }
  }

  const result = contents.join('\n');
  const newPath = path.join(__dirname, 'bundle.css');

  await fs.promises.writeFile(newPath, result);
}

buildStyles()
  .then(() => console.log('bundle Ok!'))
  .catch((err) => console.error(err));