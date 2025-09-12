const { Schema, model } = require("mongoose")

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Task description is required."],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["To Do", "In Progress", "Done"],
        message: "{VALUE} is not a valid status.",
      },
      default: "To Do",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      immutable: true,
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

const Task = model("Task", taskSchema)

module.exports = Task
