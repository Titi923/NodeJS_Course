const fs = require('fs') // For the file system

// BLOCKING, Synchronous way
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textInput);

// const textOutput = `This is what we know about avocado: ${textInput} Created on: ${Date.now()}` 

// fs.writeFileSync('./txt/output.txt', textOutput)
// console.log("File written");


// NON-BLOCKING, Asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
  console.log(err);
  console.log(data);
})
