const express = require('express')
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

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:3001/api/v1/auth/google/callback",
// },
//   function(accessToken, refreshToken, profile, cb) {
//     // Here, you would typically find or create a user in your database
//     return cb(null, profile);
//   }
// ));

// Serialize user into a JWT
// const generateToken = (user) => {
//   return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// app.get('/api/v1/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/api/v1/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, generate a JWT
//     const token = generateToken({ id: req.user.id, displayName: req.user.displayName, emails: req.user.emails });
//     res.redirect(`http://localhost:3000?token=${token}`);
//   }
// );

app.use(cors({
  origin: 'http://localhost:3000', 
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