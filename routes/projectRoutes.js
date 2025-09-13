const router = require("express").Router()

const { authMiddleware, userOwnsProject } = require("../middleware/auth")

const {
  createProject,
  viewAllProjects,
  viewProject,
  editProject,
  deleteProject,
} = require("../controllers/projectController")

const taskRoutes = require("./taskRoutes")

router.use(authMiddleware)

router.post("/", createProject)
router.get("/", viewAllProjects)

router.get("/:projectId", userOwnsProject, viewProject)
router.put("/:projectId", userOwnsProject, editProject)
router.delete("/:projectId", userOwnsProject, deleteProject)

router.use("/:projectId/tasks", taskRoutes)

module.exports = router
