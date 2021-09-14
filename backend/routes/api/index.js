let express = require("express")
let router = express.Router()
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require("./session")
const usersRouter = require("./users")
const spotsRouter = require("./spots")

router.use("/session",sessionRouter)
router.use("/users",usersRouter)
router.use("/spots",spotsRouter)

module.exports = router
