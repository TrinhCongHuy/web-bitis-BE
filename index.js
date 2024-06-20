const express = require('express')
require('express-async-errors');
const cors = require('cors')
require('dotenv').config()
const database = require('./src/config/database')
const route = require('./src/routes/index.route')
const bodyParser = require('body-parser')
const { configLoginWithGG } = require('./src/config/passport')
const passport = require('passport');

const cookieParser = require('cookie-parser')

database.connect()
const app = express()
app.use(passport.initialize());
const port = process.env.PORT || 3001

app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()");
  next();
});

app.use(passport.initialize());

app.use(cors({
  origin: process.env.REACT_URL, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route(app)
configLoginWithGG()

app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})