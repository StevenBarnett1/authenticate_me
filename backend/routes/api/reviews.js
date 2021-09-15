const express = require("express")
const { User, Spot, Review, Booking } = require('../../db/models');
const router = express.Router()
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require("express-validator");


const validateReview = [
    check('authorId')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid authorId'),
    check('spotId')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid spotId.'),
    check('rating')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid rating'),
    handleValidationErrors,
  ];

router.post("/",validateReview,asyncHandler(async(req,res)=>{
    let {authorId,spotId,rating} = req.body
    let review = await Review.create({authorId,spotId,rating})
    return res.json(review)
}))


router.put("/:id",validateReview,asyncHandler(async(req,res)=>{
    let {id} = req.params
    let review = await Review.findByPk(id)
    review.update(req.body)
    review.save()
    res.json(review)
}))

router.delete("/:id",asyncHandler(async(req,res)=>{
    let review = await Review.findByPk(req.params.id)
    review.destroy()
    res.send("review deleted")
}))
