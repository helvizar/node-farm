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
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%PRODUCTID%}/g, product.id);
  
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }

  return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

// fs.readFile('./dev-data/data.json'); // another way to specify path name
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// convert from json to javascript
const dataObject = JSON.parse(data);

// create server
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // create routing
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObject.map(element => replaceTemplate(tempCard, element)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);
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
