const fs = require('fs');

// Read the data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
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
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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

