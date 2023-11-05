const fs = require("fs");
const http = require('http');
const url = require('url');

////////////////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about avocado ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Blocking, synchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', error => {
//         console.log('Your data has been written!');
//       });
//     });
//   });
// });
// console.log('Will read file!');

////////////////////////////////////////
// SERVER

// bikin dulu server
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is PRODUCT');
  } else {
    res.writeHead(404, 'ERROR NOT FOUND');
    res.end('Page not found');
  }
});

// listen ke request
server.listen(8000, 'localhost', () => {
  console.log('server jalan di: 8000');
});
