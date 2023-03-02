const app = require('./app')

// Create a server that listen to a port
const port = 8000;
app.listen(port, () => {
  console.log('App running on port: ' + port);
});