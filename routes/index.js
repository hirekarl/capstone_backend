const router = require("express").Router()

const userRoutes = require("./users/userRoutes")

router.use("/users", userRoutes)

module.exports = router
