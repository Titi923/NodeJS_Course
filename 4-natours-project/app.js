const fs = require('fs');
const express = require('express');

const app = express();

// middleware (is a function that can modify the incoming request data)
app.use(express.json());

// Read the data first
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // Get the id of the last current element and increment it's id to make a new unique id
  const newId = tours[tours.length - 1].id + 1;
  // Assign a new object
  const newTour = Object.assign({id: newId}, req.body)
  // Then simply add the new object to the current array
  tours.push(newTour);
  // Finally modify the database/file, and we use an async function because we are in the event loop & NEVER EVER BLOCK THE EVENT LOOP!!!
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    // What we want to do as soon as the file is written?
    
    // 200 OK, 201 Created
    res.status(201).json({
      status: "success",
      data: {
        tours: newTour
      }
    })
  })
  
  // res.send('Done'); // No need to send the res twice
});

// Create a server that listen to a port
const port = 8000;
app.listen(port, () => {
  console.log('App running on port: ' + port);
});
