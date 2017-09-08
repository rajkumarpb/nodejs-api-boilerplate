import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from './modules/user/model'

export default (config) => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  // JWT Strategy
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  }

  passport.use(new JwtStrategy(opts, (jwtPayload, next) => {
    User.findOne({ _id: jwtPayload._id }, (err, user) => {
      if (err) {
        return next(err, false)
      }
      if (user) {
        return next(null, user)
      }
      return next(null, false)
    })
  }))

  passport.jwtOptions = opts.secretOrKey

  return passport
}
