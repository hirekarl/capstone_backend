const jwt = require("jsonwebtoken")

const Project = require("../models/Project")
const Task = require("../models/Task")

const { JWT_SECRET, JWT_EXPIRY } = require("../utils")

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res
      .status(401)
      .json({ error: "HTTP 401 Unauthorized", message: "Token missing or invalid." })
  } else {
    token = token.split(" ").pop().trim()

    try {
      const { data } = jwt.verify(token, JWT_SECRET, { maxAge: JWT_EXPIRY })
      req.user = data
    } catch (error) {
      console.error(error)
      return res
        .status(401)
        .json({ error: "HTTP 401 Unauthorized", message: "Token missing or invalid." })
    }

    next()
  }
}

const userOwnsProject = async (req, res, next) => {
  const userId = req.user._id
  const projectId = req.params.projectId

  if (!projectId) {
    return res.status(400).json({
      error: "HTTP 400 Bad Request",
      message: "Missing project ID.",
    })
  }

  const foundProject = await Project.findById(projectId)

  if (!foundProject) {
    return res.status(404).json({
      error: "HTTP 404 Not Found",
      message: "Project not found.",
    })
  }

  if (String(foundProject.owner) !== String(userId)) {
    return res.status(403).json({
      error: "HTTP 403 Forbidden",
      message: "You are not authorized to view or modify this project.",
    })
  }

  next()
}

const userOwnsTask = async (req, res, next) => {
  const userId = req.user._id
  const taskId = req.params.taskId

  if (!taskId) {
    return res.status(400).json({
      error: "HTTP 400 Bad Request",
      message: "Missing task ID.",
    })
  }

  const foundTask = await Task.findById(taskId)

  if (!foundTask) {
    return res.status(404).json({
      error: "HTTP 404 Not Found",
      message: "Task not found.",
    })
  }

  const projectId = foundTask.project
  const foundProject = await Project.findById(projectId)

  if (String(foundProject.owner) !== String(userId)) {
    return res.status(403).json({
      error: "HTTP 403 Forbidden",
      message: "You are not authorized to view or modify this task.",
    })
  }

  next()
}

module.exports = { authMiddleware, userOwnsProject, userOwnsTask }
