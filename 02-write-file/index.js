const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

stdout.write('Твой ответ?\n');
stdin.on('data', data => {
  const str = data.toString().trim();
  if (str === 'exit') {
    stdout.write('Пока\n');
    process.exit();
  }
  fs.appendFile(path.join(__dirname, 'text.txt'), str + '\n', (err) => {
    if (err) throw err;
    stdout.write('Твой ответ?\n');
  });
});

process.on('SIGINT', () => {
  stdout.write('Пока\n');
  process.exit();
});