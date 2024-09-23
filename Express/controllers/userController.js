const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const getAllUsers = (req, res) => {
  res.status(500).json({
    message: "not defined yet",
   })
}

const getUser = (req, res) => {

  res.status(500).json({
    message: "not defined yet",
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    message: "not defined yet",
   })
}

const updateUser = (req, res) => {
  res.status(500).json({
    message: "not defined yet",
   })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    message: "not defined yet",
   })
}


module.exports = {getAllUsers, getUser, createUser, updateUser, deleteUser }