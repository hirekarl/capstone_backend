const router = require("express").Router()

const userRoutes = require("./users/userRoutes")
const projectRoutes = require("./projects/projectRoutes")
const taskRoutes = require("./tasks/taskRoutes")

router.use("/users", userRoutes)
router.use("/projects", projectRoutes)
router.use("/tasks", taskRoutes)

module.exports = router
