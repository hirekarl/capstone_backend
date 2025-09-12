const router = require("express").Router()

const {
  createProject,
  viewAllProjects,
  viewProject,
  editProject,
  deleteProject,
} = require("../../controllers/projects/projectController")

router.post("/", /* middleware, */ createProject)
router.get("/", /* middleware, */ viewAllProjects)
router.get("/:projectId", /* middleware, */ viewProject)
router.put("/:projectId", /* middleware, */ editProject)
router.delete("/:projectId", /* middleware, */ deleteProject)

module.exports = router
