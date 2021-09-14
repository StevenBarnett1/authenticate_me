const express = require("express")
const { User, Spot } = require('../../db/models');
const router = express.Router()
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require("express-validator");

const validateSpot = [
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid name'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid description.'),
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid address'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid city'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid state'),
    check('zipCode')
      .exists({ checkFalsy: true })
      .isLength({ min: 5 })
      .isLength({ max: 5 })
      .withMessage('Please provide a valid zip code'),
    check('hostId')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid host id'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid price'),
    handleValidationErrors,
  ];

router.post("/",validateSpot,asyncHandler(async(req,res)=>{
    let {name,description,address,city,state,zipCode,hostId,price} = req.body
    let spot = await Spot.create({name,description,address,city,state,zipCode,hostId,price})
    return res.json(spot)
}))

router.get("/cities/:city",async(req,res)=>{
  let spots = await Spot.findAll({where:{
    city:req.params.city.split("-").join(" "),
  },
  include:User
})
  return res.json(spots)
})


router.get("/:id",async(req,res)=>{
  let spot = await Spot.findByPk(req.params.id,{include:User})
  console.log("SPOT",spot)
  return res.json(spot)
})

router.get("/",async(req,res)=>{
  let spots = await Spot.findAll({include:User})
  return res.json(spots)
})

router.put("/:id",validateSpot,asyncHandler(async(req,res)=>{
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

router.delete("/:id",asyncHandler(async(req,res)=>{
    let spot = await Spot.findByPk(req.params.id)
    spot.destroy()
    res.send("spot deleted")
}))

module.exports = router
