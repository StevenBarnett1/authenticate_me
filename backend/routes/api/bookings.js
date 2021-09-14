const express = require("express")
const { User, Spot, Booking } = require('../../db/models');
const router = express.Router()
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require("express-validator");


const validateBookings = [
    check('buyerId')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid buyer id'),
    check('spotId')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid spot id'),
    check('checkin')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid checkin'),
    check('checkout')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid checkout'),
    handleValidationErrors,
  ];


  router.post("/",validateBookings,asyncHandler(async(req,res)=>{
    let {checkin, checkout, buyerId,spotId} = req.body
    let booking = await Booking.create({checkin,checkout,buyerId,spotId})
    res.json(booking)
  }))

  router.put("/:id",validateBookings,asyncHandler(async(req,res)=>{
    let booking = await Booking.findByPk(req.params.id)
    booking.update(req.body)
    booking.save()
    res.json(booking)
  }))

  router.delete("/:id",asyncHandler(async(req,res)=>{
    let booking = await Booking.findByPk(req.params.id)
    booking.destroy()
    res.json()
  }))


module.exports = router
