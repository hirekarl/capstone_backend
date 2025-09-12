const express = require("express")

const connect = require("./db")
const routes = require("./routes")

const { PORT } = require("./utils")

const run = async () => {
  await connect()

  const app = express()

  app.use(express.json())

  app.use("/api", routes)

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}

run()
