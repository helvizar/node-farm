const fs = require("fs");
const http = require("http");
const url = require("url");

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

// read file, only read file once and only at the beginning when the program started, so it using synchronous version.
// Top-level code.
// fs.readFile('./dev-data/data.json'); // another way to specify path name
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// convert from json to javascript
const dataObject = JSON.parse(data);

// create server
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // create routing
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data); // has access to the top-level code
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("Page not found");
  }
});

// listen to request
server.listen(8000, "localhost", () => {
  console.log("server jalan di: 8000");
});
