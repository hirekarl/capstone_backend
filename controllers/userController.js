const jwt = require("jsonwebtoken")

const User = require("../models/User")

const { JWT_SECRET, JWT_EXPIRY, handle500 } = require("../utils")

const handle409 = (res) => {
  return res.status(409).json({
    error: "HTTP 409 Conflict",
    message: "User with this email address already exists.",
  })
}

const handle401 = (res) => {
  return res.status(401).json({
    error: "HTTP 401 Unauthorized",
    message: "Incorrect email address or password.",
  })
}

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const foundUser = await User.findOne({ email: email })
    if (foundUser) return handle409(res)

    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
    })

    const token = jwt.sign({ data: newUser }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    })

    return res.status(201).json({ user: newUser, token: token })
  } catch (error) {
    return handle500(error, res)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email: email })
    if (!foundUser) return handle401(res)

    const passwordIsCorrect = await foundUser.isCorrectPassword(password)
    if (!passwordIsCorrect) return handle401(res)

    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    }

    const token = jwt.sign({ data: payload }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    })

    return res.status(200).json({ token: token, user: foundUser })
  } catch (error) {
    return handle500(error, res)
  }
}

const validateToken = async () => {
  return res.status(200).json({
    message: "Token validated.",
  })
}

module.exports = { register, login, validateToken }
