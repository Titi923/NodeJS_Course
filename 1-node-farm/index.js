const fs = require('fs') // For the file system
const http = require('http') // Gives us the networking capabilities
const url = require('url') // Gives us the networking capabilities

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{% PRODUCT_ID %}/g, product.id)
  output = output.replace(/{% PRODUCT_NAME %}/g, product.productName);
  output = output.replace(/{% PRODUCT_IMAGE %}/g, product.image);
  output = output.replace(/{% PRODUCT_ORIGIN %}/g, product.from);
  output = output.replace(/{% PRODUCT_NUTRIENTS %}/g, product.nutrients);
  output = output.replace(/{% PRODUCT_QUANTITY %}/g, product.quantity);
  output = output.replace(/{% PRODUCT_PRICE %}/g, product.price);
  output = output.replace(/{% PRODUCT_DESCRIPTION %}/g, product.description);

	if(!product.organic) {
    output = output.replace(/{% NOT_ORGANIC %}/g, 'not-organic');
  }
  
  return output
}

// Templates
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')

// Read the data just once
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

// First we create the server
const server = http.createServer((req, res) => {

  const {query, pathname} = url.parse(req.url, true)

  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { 'Content-type': 'text/html' })

    const productsHtml = dataObj.map(el => replaceTemplate(tempOverview, el)).join('')   
    console.log(productsHtml);
      res.end(`<h1>🌽 Node Farm 🥦</h1>\n ${productsHtml}`);
    
  // Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, { 'Content-type': 'text/html' })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)

    res.end(output)

  // API
  } else if (pathname === "/api") {
    // Read the data
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(data);
  
  // Not Found
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