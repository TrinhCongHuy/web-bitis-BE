const express = require('express')
require('dotenv').config()
const cors = require('cors')
const database = require('./src/config/database')
const route = require('./src/routes/index.route')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

database.connect()
const app = express()
const port = process.env.PORT | 3001

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})