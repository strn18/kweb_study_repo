const fs = require('fs');
const path = require('path');


// async
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const printJS = async curDir => {
  try {
    const files = await readdir(curDir);

    for (let file of files) {
      const nextDir = path.join(curDir, file);
      const stats = await stat(nextDir);

      if (stats.isDirectory()) printJS(nextDir);
      else if (path.extname(file) === '.js') console.log(nextDir);
    }
  } catch (err) {
    console.error(err);
  }
};


// sync
// function printJS(curDir) {
//   fs.readdir(curDir, (err, files) => {
//     if (err) console.error(err);

//     else {
//       for (let file of files) {
//         const nextDir = path.join(curDir, file);

//         fs.stat(nextDir, (err, stats) => {
//           if (err) console.error(err);
        
//           else if (stats.isDirectory()) printJS(nextDir);

//           else if (path.extname(file) === '.js') console.log(nextDir);
//         })
//       }
//     }
//   })
// }


// main
printJS('./test');


// fs, path module methods practice
// fs.readdir('./test', (error, files) => {
//   if(error){
//     console.log(error);
//   }

//   console.log(files);
// })

// fs.stat('./test/01.js', (error, stats) => {
//   if(error){
//     console.log(error);
//   }

//   else if(stats.isDirectory()){
//     console.log(stats);
//   }
// })

// console.log(path.extname('./test/01.js'));

// console.log(path.join('./test', '/01.js'));