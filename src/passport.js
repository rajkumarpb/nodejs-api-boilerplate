import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from './modules/user/model'

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// JWT Strategy
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}

passport.use(new JwtStrategy(opts, function(jwt_payload, next) {
  User.findOne({ _id: jwt_payload._id }, function(err, user) {
      if (err) {
        return next(err, false)
      }
      if (user) {
        return next(null, user)
      } else {
        return next(null, false)
      }
  })
}))

passport.jwtOptions = opts.secretOrKey

export default passport