const express = require('express')
const router = express.Router()
const passport = require('passport')
require('dotenv').config()


// Login with google
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"]}));

router.get("/google/callback", (req, res, next) => 
  {
    passport.authenticate("google", (err, profile) => {
      console.log('profile', profile)
      req.user = profile
      next()
    })(req, res, next)
  }, (req, res) => {
    res.redirect(process.env.REACT_URL)
  }
);


module.exports = router