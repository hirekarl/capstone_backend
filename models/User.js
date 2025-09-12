const bcrypt = require("bcrypt")

const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "Username must be unique."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      unique: [true, "Email address must be unique."],
      trim: true,
      match: [/.+\@.+\..+/, "You must supply a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: 8,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
      },
    },
  }
)

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
  }

  next()
})

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model("User", userSchema)

module.exports = User
