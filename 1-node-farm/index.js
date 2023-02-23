const fs = require('fs') // For the file system
const http = require('http') // Gives us the networking capabilities
const url = require('url') // Gives us the networking capabilities

// First we create the server
const server = http.createServer((req, res) => {
  const pathName = req.url;



  // Routing
  if (pathName === "/" || pathName === "/overview") {
    res.end("This page is the Overview");
  } else if (pathName === "/product") {
    res.end("This page is the Product page");
  } else if (pathName === "/api") {
    // Read the data
    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
    data = JSON.parse(data)
    console.log(data);
    res.end(`API ${data}`);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html', // Inform the browser about the Content-type and the browser will expect what you informed here
      'my-own-custom-header': 'hello-world!!!', // You can also create custom headers
    });
    res.end('<h1>Page not found!</h1>'); // Because you informed about the Content-type as html now you can write html
  }


})

// Then we start the server
server.listen(8000, '127.0.0.1', () => {
  console.log("Listening to requests on port 8000 lol");
})