const router = require("express").Router()

const { authMiddleware, userOwnsProject } = require("../middleware/auth")

const {
  createProject,
  viewAllProjects,
  viewProject,
  editProject,
  deleteProject,
} = require("../controllers/projectController")

const {
  createTask,
  viewProjectTasks,
} = require("../controllers/taskController")

router.use(authMiddleware)

router.post("/", createProject)
router.get("/", viewAllProjects)

router.get("/:projectId", userOwnsProject, viewProject)
router.put("/:projectId", userOwnsProject, editProject)
router.delete("/:projectId", userOwnsProject, deleteProject)

router.post("/:projectId/tasks", userOwnsProject, createTask)
router.get("/:projectId/tasks", userOwnsProject, viewProjectTasks)

// TODO: Consider making all tasks endpoints nested; use mergeParams.
// see https://expressjs.com/en/guide/routing.html

module.exports = router
