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
  // viewTask,
  // editTask,
  // deleteTask
} = require("../controllers/taskController")

router.use(authMiddleware)

router.post("/", createProject)
router.get("/", viewAllProjects)

router.get("/:projectId", userOwnsProject, viewProject)
router.put("/:projectId", userOwnsProject, editProject)
router.delete("/:projectId", userOwnsProject, deleteProject)

router.post("/:projectId/tasks", createTask)
router.get("/:projectId/tasks", viewProjectTasks)

module.exports = router
