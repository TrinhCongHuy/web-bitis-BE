const express = require('express')
const router = express.Router()
const passport = require('passport')
require('dotenv').config()


// Login with google
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"], session: false }));

router.get("/google/callback", 
  (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/');
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    const { access_token, refresh_token } = req.user;
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: 'strict' // Adjust this as needed
    });
    // res.redirect(`http://localhost:3000/auth/success?access_token=${access_token}`);
    res.redirect(process.env.REACT_URL + `/auth/success?access_token=${access_token}`);
  }
);


module.exports = router