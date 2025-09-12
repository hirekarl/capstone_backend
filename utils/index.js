require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = "2h"

module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET,
  JWT_EXPIRY
}
