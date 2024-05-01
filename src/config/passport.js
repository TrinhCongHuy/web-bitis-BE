const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
// const { Strategy: FacebookStrategy } = require('passport-facebook');
const authController = require("../controllers/auth.controller");

// Login with google
module.exports.configLoginWithGG = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL_GG,
    passReqToCallback: true
  },
  
    async function(req, accessToken, refreshToken, profile, cb) {
      const typeAcc = "Google";
      const dataRaw = {
        name: profile.displayName,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : "",
        avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : profile.id
      }

      let user = await authController.upsertUserSocialMedia(req, typeAcc, dataRaw)
      return cb(null, user)
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}

// Login with facebook
// module.exports.configLoginWithFB = () => {
//   passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL_FB,
//     passReqToCallback: true,
//     profileFields: ['id', 'emails', 'displayName', 'photos']
//   },
  
//     async function(req, accessToken, refreshToken, profile, cb) {
//       const typeAcc = "Facebook";
//       const dataRaw = {
//         fullName: profile.displayName,
//         email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : profile.id
//       }

//       let user = await authController.upsertUserSocialMedia(req, typeAcc, dataRaw)
//       return cb(null, user)
//     }
//   ));

//   passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });
// }
