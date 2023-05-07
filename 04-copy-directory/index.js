const fs = require('fs').promises;
const path = require('path');

const srcDir = './04-copy-directory/files';
const destDir = './04-copy-directory/files-copy';

async function copyDir(srcPath, destPath) {

  try {
    await fs.access(destPath);
    await fs.rm(destPath, { recursive: true });
  } catch (error) {
    
  }

  await fs.mkdir(destPath, { recursive: true });

  const entries = await fs.readdir(srcPath, { withFileTypes: true });

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const srcFile = path.join(srcPath, entry.name);
    const destFile = path.join(destPath, entry.name);
    
    if (entry.isDirectory()) {
      
      await copyDir(srcFile, destFile);
    } else {
      
      await fs.copyFile(srcFile, destFile);
    }
  }
}

copyDir(srcDir, destDir)
  .then(() => console.log('Копирование завершено'))
  .catch(err => console.error('Ошибка копирования:', err));