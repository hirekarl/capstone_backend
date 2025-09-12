require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = "2h"

const handle500 = (error, res) => {
  console.error("Internal server error:", error)
  return res.status(500).json({
    error: "HTTP 500 Internal Server Error",
    message: "Couldn't complete the request.",
  })
}

const handle401 = (res) => {
  return res.status(401).json({
    error: "HTTP 401 Unauthorized",
    message: "Token missing or invalid.",
  })
}

module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET,
  JWT_EXPIRY,
  handle500,
  handle401,
}
