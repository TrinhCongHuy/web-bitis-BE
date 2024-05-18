const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const controller = require('../controllers/user.controller')


// Login with google
module.exports.configLoginWithGG = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/v1/auth/google/callback",
  },
  
    async function(accessToken, refreshToken, profile, cb) {
      const typeAcc = "Google";
      const dataRaw = {
        fullName: profile.displayName,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : "",
        avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : profile.id
      }
  
      if (profile?.id) {
        await controller.upsertUserSocialMedia(typeAcc, dataRaw)
      }
      
      return cb(null, profile)
    }
  ));
}

