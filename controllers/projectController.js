const Project = require("../models/Project")

const { handle500 } = require("../utils")

// POST /api/projects
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body
    const ownerId = req.user._id

    const newProject = await Project.create({
      name: name,
      description: description,
      owner: ownerId,
    })

    return res.status(201).json(newProject)
  } catch (error) {
    return handle500(error, res)
  }
}

// GET /api/projects
const viewAllProjects = async (req, res) => {
  try {
    const ownerId = req.user._id
    const allProjects = await Project.find({ owner: ownerId })

    return res.status(200).json(allProjects)
  } catch (error) {
    return handle500(error, res)
  }
}

// GET /api/projects/:projectId
const viewProject = async (req, res) => {
  try {
    const projectId = req.params.projectId
    const foundProject = await Project.findById(projectId)

    return res.status(200).json(foundProject)
  } catch (error) {
    return handle500(error, res)
  }
}

// PUT /api/projects/:projectId
const editProject = async (req, res) => {
  try {
    const projectId = req.params.projectId
    const foundProject = await Project.findById(projectId)

    const editedProject = await Project.findByIdAndUpdate(
      foundProject._id,
      {
        ...req.body,
      },
      { new: true }
    )

    return res.status(200).json(editedProject)
  } catch (error) {
    return handle500(error, res)
  }
}

// DELETE /api/projects/:projectId
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId
    const foundProject = await Project.findById(projectId)

    const deletedProject = await Project.findByIdAndDelete(foundProject._id)

    return res.status(200).json(deletedProject)
  } catch (error) {
    return handle500(error, res)
  }
}

module.exports = {
  createProject,
  viewAllProjects,
  viewProject,
  editProject,
  deleteProject,
}
