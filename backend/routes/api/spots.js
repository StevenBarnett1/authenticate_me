const express = require("express")
const { User, Spot } = require('../../db/models');
const router = express.Router()
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

router.post("/spots",asyncHandler(async(req,res)=>{
    let {name,description,address,city,state,zipCode,hostId,price} = req.body
    let spot = await Spot.create({name,description,address,city,state,zipCode,hostId,price})
    res.json(spot)
}))

router.put("/spots/:id",asyncHandler(async(req,res)=>{
    let {id} = req.params
    let {name,description,address,city,state,zipCode,hostId,price} = req.body
    let spot = await Spot.findByPk(id)
    spot.name = name
    spot.description = description
    spot.address = address
    spot.city = city
    spot.state = state
    spot.zipCode = zipCode
    spot.hostId = hostId
    spot.price = price
    spot.save()
    res.json(spot)
}))

router.delete("/spots/:id",asyncHandler(async(req,res)=>{
    let spot = await Spot.findByPk(req.params.id)
    spot.destroy()
    res.send("spot deleted")
}))

module.exports = router
