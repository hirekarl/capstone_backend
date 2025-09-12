const router = require("express").Router()

const { authMiddleware, userOwnsProject } = require("../../middleware/auth")

const {
  createProject,
  viewAllProjects,
  viewProject,
  editProject,
  deleteProject,
} = require("../../controllers/projects/projectController")

router.use(authMiddleware)

router.post("/", createProject)
router.get("/", viewAllProjects)

router.get("/:projectId", userOwnsProject, viewProject)
router.put("/:projectId", userOwnsProject, editProject)
router.delete("/:projectId", userOwnsProject, deleteProject)

module.exports = router
