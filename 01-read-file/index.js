const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

readStream.on('data', (chunk) => {
  console.log(chunk.toString());
});

/*
fs.readFile(
  path.join(__dirname, 'text.txt'),
  'utf-8',
   (error, data) => {
     if (error) throw error;
     console.log(data);
   } 
);
*/