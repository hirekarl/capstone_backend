const router = require("express").Router()

const { authMiddleware } = require("../../middleware/auth")

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
router.get("/:projectId", viewProject)
router.put("/:projectId", editProject)
router.delete("/:projectId", deleteProject)

module.exports = router
