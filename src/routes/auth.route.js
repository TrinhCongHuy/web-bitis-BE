const express = require('express')
const router = express.Router()
const passport = require('passport')
const session = require('express-session');
const controller = require('../controllers/auth.controller')

function isLoggedIn(req, res, next) {
  if (req.user) {
    console.log('req.user', req.user)
    res.redirect("/");
  } else {
    res.sendStatus(401);
  }
}

// Sử dụng middleware session
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Sử dụng middleware Passport.js
router.use(passport.initialize());
router.use(passport.session());


// Login with google
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure"
  })
);

// Login with facebook
router.get('/facebook', passport.authenticate('facebook',  { scope: ["email"] }));

router.get('/facebook/callback',
  passport.authenticate("facebook", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/facebook/failure"
  })
);



router.get("/protected", isLoggedIn, controller.upsertUserSocialMedia);

router.get("/google/failure", (req, res) => {
  res.send("Something went wrong");
});

router.get("/facebook/failure", (req, res) => {
  res.send("Something went wrong");
});



module.exports = router