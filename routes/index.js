const router = require("express").Router()

const userRoutes = require("./users/userRoutes")
const projectRoutes = require("./projects/projectRoutes")

router.use("/users", userRoutes)
router.use("/projects", projectRoutes)

module.exports = router
