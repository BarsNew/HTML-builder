const fs = require('fs');
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        //console.log(`${filePath} is a file`);
        const ext = path.extname(filePath).replace('.', '');
        const name = path.basename(filePath, ext).replace(/\.$/, '');
        const size = stats.size;
        const fileSizeInKB = (size / 1024).toFixed(3);
        console.log(`${name} - ${ext} - ${fileSizeInKB}kb`);
      }
    });
  });
});