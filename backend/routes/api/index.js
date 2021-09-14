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

router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
      where: {
        username: 'demo user'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user });
}));

const { restoreUser } = require('../../utils/auth.js');
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);


const { requireAuth } = require('../../utils/auth.js');
const { default: spotsReducer } = require("../../../frontend/src/store/spots.js");
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router
