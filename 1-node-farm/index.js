const fs = require('fs') // For the file system
const http = require('http') // Gives us the networking capabilities

// First we create the server
const server = http.createServer((req, res) => {
  res.end('Hello from the server')
})

// Then we start the server
server.listen(8000, '127.0.0.1', () => {
  console.log("Listening to requests on port 8000 lol");
})