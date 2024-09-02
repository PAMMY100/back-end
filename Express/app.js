const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const port = 3000;

//Middlewares
app.use(morgan('dev'));
app.use(express.json())

app.use((req, res, next) => {
  console.log("Hello from the middleware 👌");
  next();
})

app.use((req, res, next) => { 
  req.requestTime = new Date().toISOString()
  next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//Route handlers

const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    }
  });
}

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    })
  }
  const tour = tours.find(el => el.id === id)
  res.status(200).json({
    status: 'success',
    tour
  })
}

const createTour = (req, res) => {
  // console.log(req.body);
 const newId = tours[tours.length - 1].id + 1;
 const newTour = Object.assign({id: newId}, req.body);

 tours.push(newTour);
 fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
  res.status(201).json({
    status: 'success',
    tours: newTour,
  })
 });
}

const updateTour = (req, res) => { 
  const id = req.params.id * 1;
  const tour = tours.find( el => el.id === id);
  const newTour = Object.assign(req.body)
  res.status(200).json({
    status: 'success',
    data: {
      tour: newTour
    }
  })
}

const deleteTour = (req, res) => {
  if(req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "tour not found",
    })
  }
  res.status(204).json({
    status: "success",
    data: null
  })

}

// app.get('/api/v1/tours', );
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

//3) ROUTES

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser)

app
  .route('/api/v1/users/:id')
  .patch(updateUser)
  .delete(deleteUser)

//4) START SERVER  
app.listen(port, () => {
  console.log("running on port: " + port);
});