const router = require("express").Router({ mergeParams: true })

const {
  authMiddleware,
  userOwnsProject,
  userOwnsTask,
} = require("../middleware/auth")

const {
  createTask,
  viewProjectTasks,
  viewTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController")

router.use(authMiddleware)

router.post("/", userOwnsProject, createTask)
router.get("/", userOwnsProject, viewProjectTasks)

router.get("/:taskId", userOwnsTask, viewTask)
router.patch("/:taskId", userOwnsTask, editTask)
router.delete("/:taskId", userOwnsTask, deleteTask)

module.exports = router
