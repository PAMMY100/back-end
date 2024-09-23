const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


const checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    })
  }
  next();
}

const validateData = (req, res, next) => {
  if (!(req.body.name && req.body.price )) {
    return res.status(400).json({
      status: "failed",
      message: "missing name or price",
    })
  }
  next();
}

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
  const id = req.params.id * 1
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
 console.log(req.body);

 tours.push(newTour);
 fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
  res.status(201).json({
    status: 'success',
    tours: newTour,
  })
 });
}

const updateTour = (req, res) => { 
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

module.exports = {getAllTours, getTour, createTour, updateTour, deleteTour, checkID, validateData}