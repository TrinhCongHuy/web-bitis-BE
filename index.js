const express = require('express')
require('dotenv').config()
const cors = require('cors')
const database = require('./src/config/database')
const route = require('./src/routes/index.route')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport') 
const { configLoginWithGG } = require('./src/config/passport') 


database.connect()
const app = express()
const port = process.env.PORT || 3001

const allowedOrigins = ['http://localhost:3000'];

// Thiết lập session middleware
app.use(require('express-session')({ 
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Sử dụng Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(cors())

// Cấu hình CORS
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true // Cho phép truy cập cookie qua CORS
// }));

app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route(app)
configLoginWithGG()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})