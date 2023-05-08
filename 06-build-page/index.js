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

copyDir(oldAssets, newAssets) 
  .then(() => console.log('Копирование assets завершено'))
  .catch(err => console.error('Ошибка копирования:', err));

buildStyles(oldStyles, newStyles, oldF, newF)
  .then(() => console.log('Объединение стилей завершено!'))
  .catch((err) => console.error('Ошибка объединения стилей:', err));

const templatePath = './06-build-page/template.html';
const headerPath = './06-build-page/components/header.html';
const articlesPath = './06-build-page/components/articles.html';
const footerPath = './06-build-page/components/footer.html';

Promise.all([
  fs.readFile(templatePath, 'utf8'),
  fs.readFile(headerPath, 'utf8'),
  fs.readFile(articlesPath, 'utf8'),
  fs.readFile(footerPath, 'utf8')
]).then(([template, header, articles, footer]) => {
  const html = template.replace('{{header}}', header).replace('{{articles}}', articles).replace('{{footer}}', footer);

  fs.writeFile('./06-build-page/project-dist/index.html', html);
}).catch((err) => {
  console.error(err);
});  