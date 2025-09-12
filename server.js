const express = require("express")

const connect = require("./db")

const { PORT } = require("./utils")

const run = async () => {
  await connect()

  const app = express()

  app.use(express.json())

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}

run()
