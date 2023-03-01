const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
// middleware (is a function that can modify the incoming request data)
app.use(morgan('dev'))

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋 ');
  next()
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next()
})

// Read the data first
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS
// Get All Tours
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
// URL Params
const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
// Create Tour
const createTour = (req, res) => {
  // Get the id of the last current element and increment it's id to make a new unique id
  const newId = tours[tours.length - 1].id + 1;
  // Assign a new object
  const newTour = Object.assign({ id: newId }, req.body);
  // Then simply add the new object to the current array
  tours.push(newTour);
  // Finally modify the database/file, and we use an async function because we are in the event loop & NEVER EVER BLOCK THE EVENT LOOP!!!
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // What we want to do as soon as the file is written?
      // 200 OK, 201 Created
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );

  // res.send('Done'); // No need to send the res twice
};
// PATCH Requests
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    staus: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};
// DELETE Requests
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    staus: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTES
// Refactored route
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// 4) START THE SERVER
// Create a server that listen to a port
const port = 8000;
app.listen(port, () => {
  console.log('App running on port: ' + port);
});
