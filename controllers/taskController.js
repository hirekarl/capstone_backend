const Task = require("../models/Task")

const handle500 = require("../utils")

// POST /api/projects/:projectId/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, status = "To Do" } = req.body
    const projectId = req.params.projectId

    const newTask = await Task.create({
      title: title,
      description: description,
      status: status,
      project: projectId,
    })

    return res.status(201).json(newTask)
  } catch (error) {
    return handle500(error, res)
  }
}

// GET /api/projects/:projectId/tasks
const viewProjectTasks = async (req, res) => {
  try {
    const projectId = req.params.projectId
    const foundTasks = await Task.find({ project: projectId })

    return res.status(200).json(foundTasks)
  } catch (error) {
    return handle500(error, res)
  }
}

// GET /api/tasks/:taskId
const viewTask = async (req, res) => {
  try {
    const taskId = req.params.taskId
    const foundTask = await Task.findById(taskId)

    return res.status(200).json(foundTask)
  } catch (error) {
    return handle500(error, res)
  }
}

// PATCH /api/tasks/:taskId
const editTask = async (req, res) => {
  try {
    const taskId = req.params.taskId
    const foundTask = await Task.findById(taskId)

    const editedTask = await Task.findByIdAndUpdate(
      foundTask._id,
      { ...req.body },
      { new: true }
    )

    return res.status(200).json(editedTask)
  } catch (error) {
    return handle500(error, res)
  }
}

// DELETE /api/tasks/:taskId
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId
    const foundTask = await Task.findById(taskId)

    const deletedTask = await Task.findByIdAndDelete(foundTask._id)

    return res.status(200).json(deletedTask)
  } catch (error) {
    return handle500(error, res)
  }
}

module.exports = {
  createTask,
  viewProjectTasks,
  viewTask,
  editTask,
  deleteTask,
}
