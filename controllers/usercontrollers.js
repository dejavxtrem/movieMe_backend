
const express = require("express");
const userRouter = express.Router();
const User = require('../models/movieusers');

userRouter.get('/', (req, res) => {
  User.find({}, (err, foundUser) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundUser)
  })
})

//create
userRouter.post('/', (req, res) => {
  console.log('hello')
  console.log(req.body)
  User.create(req.body, (error, foundUser) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
 
    res.status(200).json(foundUser) //  .json() will send proper headers in response so client knows it's json coming back
  })
})

//delete
userRouter.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, foundUser) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundUser)
  })
})

//update
userRouter.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, foundUser) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundUser)
  })
})


module.exports = userRouter