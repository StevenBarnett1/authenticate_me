let express = require("express")
let router = express.Router()
const asyncHandler = require('express-async-handler');

const sessionRouter = require("./session")
const usersRouter = require("./users")
const spotsRouter = require("./spots")
const bookingsRouter = require("./bookings")

router.use("/session",sessionRouter)
router.use("/users",usersRouter)
router.use("/spots",spotsRouter)
router.use("/bookings",bookingsRouter)

module.exports = router
