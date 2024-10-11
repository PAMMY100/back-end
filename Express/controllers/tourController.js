const Tour = require('./../models/tourModels')

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price.ratingsAverage,summary,difficulty';
  next();
}


const getAllTours = async (req, res) => {
  try {
    console.log(req.query)
    //BUILD QUER
    //1) Filtering
    const queryObj = {...req.query};
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach(el => delete queryObj[el])

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`) 

    let query = Tour.find(JSON.parse(queryStr))

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    //4) Fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if(req.query.page) {
      const numTours = await Tour.countDocuments();
      if(skip >= numTours) throw new Error('This page does not exist');
    }


    //EXECUTE QUERY
    const tours = await query

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      }
    });
  } catch (err) { 
    res.status(404).json({
      status: "fail",
      message: err.message
    })
  }
}

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      tour
    })
  } catch (err) {
    res.status(404).json({
      success: "fail",
      message: "tour not found",
   })
  }
}
const createTour = async (req, res) => {
  // console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      }
    })
  
  } catch (err) { 
    res.status(400).json({
      status: 'fail',
      message: "Invalid data"
    })
  }
}

const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, 
    {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    })

  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: "Failed to update tour"
    })
  }
}

const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndDelete(id)

    res.status(204).json({
      status: "success",
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Can not delete tour"
    })
  }
}

module.exports = {getAllTours, getTour, createTour, updateTour, deleteTour, aliasTopTours}