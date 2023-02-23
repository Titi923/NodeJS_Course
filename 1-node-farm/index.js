const fs = require('fs'); // For the file system
const http = require('http'); // Gives us the networking capabilities
const url = require('url'); // Gives us the networking capabilities

// Read the data just once
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Template
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`)

// First we create the server
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Routing
  if (pathName === '/' || pathName === '/overview') {
    // OVERVIEW PAGE
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(tempOverview);
    
  } else if (pathName === '/product') {
    // OVERVIEW PAGE
    res.end('This page is the Product page');
  } else if (pathName === '/api') {
    // Read the data
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html', // Inform the browser about the Content-type and the browser will expect what you informed here
      'my-own-custom-header': 'hello-world!!!', // You can also create custom headers
    });
    res.end('<h1>Page not found!</h1>'); // Because you informed about the Content-type as html now you can write html
  }
});

// Then we start the server
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000 lol');
});
