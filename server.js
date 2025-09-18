const express = require("express")
const cors = require("cors")

const connect = require("./db")
const routes = require("./routes")

const { PORT, CLIENT_ORIGIN } = require("./utils")

const corsOptions = {
  origin: CLIENT_ORIGIN,
  optionsSuccessStatus: 200,
}

const run = async () => {
  await connect()

  const app = express()

  app.use(cors(corsOptions))
  app.use(express.json())

  app.use("/api/v1", routes)

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
  })
}

run()
