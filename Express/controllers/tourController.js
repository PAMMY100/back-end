const Tour = require('./../models/tourModels')
const APIFeatures = require('../utils/apiFeatures')
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price.ratingsAverage,summary,difficulty';
  next();
}



const getAllTours = async (req, res) => {
  try {

    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    const tours = await features.query

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
    
  }
}

const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: {ratingsAverage: {$gte: 4.5}}
      },
      {
        $group: {
          _id: { $toUpper : ` $difficulty`},
          numTours: { $sum: 1},
          numRatings: { $sum: `$ratingsQuantity`},
          avgRating: { $avg: `$ratingsAverage` },
          avgPrice: { $avg: `$price` },
          minPrice: { $min:  `$price` },
          maxPrice: { $max: `$price` },
        }
      }, 
      {
        $sort: { avgPrice: 1},
      },
      {
        $match: { _id: { $ne:  'EASY' } },
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    })
  }
}


const getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: { 
          startDates: { 
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        }
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 6
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    })

  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    })
  }
}

module.exports = {getAllTours, getTour, createTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan}