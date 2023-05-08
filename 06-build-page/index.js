const fs = require('fs').promises;
const path = require('path');

const copyDir = require('../04-copy-directory/index.js');
const buildStyles = require('../05-merge-styles/index');

const oldAssets = './06-build-page/assets';
const newAssets = './06-build-page/project-dist/assets';

const oldF = './06-build-page';
const newF = './06-build-page/project-dist';
const oldStyles = 'styles';
const newStyles = 'style.css';

const templatePath = './06-build-page/template.html';
const componentsPath = './06-build-page/components';

const newIndex = './06-build-page/project-dist/index.html';

copyDir(oldAssets, newAssets) 
  .then(() => console.log('Копирование assets завершено'))
  .catch(err => console.error('Ошибка копирования:', err));

buildStyles(oldStyles, newStyles, oldF, newF)
  .then(() => console.log('Объединение стилей завершено'))
  .catch((err) => console.error('Ошибка объединения стилей:', err));

async function buildPage(template, component, directory, inFile) {
  const [newTemplate, files] = await Promise.all([
    fs.readFile(template, 'utf8'),
    fs.readdir(component, { withFileTypes: true })
  ]);

  const components = {};
  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.html') {
      const name = path.basename(file.name, '.html');
      components[name] = await fs.readFile(path.join(component, file.name), 'utf8');
    }
  }

  let html = newTemplate;
  for (const name in components) {
    const tag = `{{${name}}}`;
    const content = components[name];
    html = html.replace(tag, content);
  }

  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(inFile, html);
}

buildPage(templatePath, componentsPath, newF, newIndex )
  .then(() => console.log('Замен шаблонных тегов завершена'))
  .catch((err) => console.error(err));