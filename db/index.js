const mongoose = require("mongoose")

const { MONGO_URI } = require("../utils")

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("Connected to database.")
  } catch (error) {
    console.error("Couldn't connect to database:", error)
    process.exit(1)
  }
}

module.exports = connect
