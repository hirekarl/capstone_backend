const { Schema, model } = require("mongoose")

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required."],
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.__v
        return ret
      },
    },
  }
)

const Project = model("Project", projectSchema)

module.exports = Project
