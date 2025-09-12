const jwt = require("jsonwebtoken")

const User = require("../models/User")

const { JWT_SECRET, JWT_EXPIRY } = require("../utils")

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res
      .status(401)
      .json({ error: "HTTP 401 Unauthorized", message: "Token missing." })
  } else {
    token = token.split(" ").pop().trim()

    try {
      const { data } = jwt.verify(token, JWT_SECRET, { maxAge: JWT_EXPIRY })
      req.user = data
    } catch (error) {
      console.error(error)
      return res
        .status(403)
        .json({ error: "HTTP 403 Forbidden", message: "Token invalid." })
    }

    next()
  }
}

module.exports = { authMiddleware }
