import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import dotenv from "dotenv";
dotenv.config();
passport.use(new GoogleStrategy({
    clientID:process.env.CLIENTID,
    clientSecret:process.env.CLIENTSecret,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    
   
    return done(null,profile)
  }
));
passport.serializeUser(function(user,done)
{
  done(null,user);
})
passport.deserializeUser(function(user,done)
{
    done(null,user);
})
