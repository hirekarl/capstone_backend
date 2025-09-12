const router = require("express").Router()

const { authMiddleware, userOwnsTask } = require("../../middleware/auth")

const {
  viewTask,
  editTask,
  deleteTask,
} = require("../../controllers/tasks/taskController")

router.use(authMiddleware)

router.get("/:taskId", userOwnsTask, viewTask)
router.put("/:taskId", userOwnsTask, editTask)
router.delete("/:taskId", userOwnsTask, deleteTask)

module.exports = router
