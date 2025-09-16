const router = require("express").Router()

const {
  register,
  login,
  validateToken,
} = require("../controllers/userController")

const { authMiddleware } = require("../middleware/auth")

router.post("/register", register)
router.post("/login", login)
router.get("/validateToken", authMiddleware, validateToken)

module.exports = router
