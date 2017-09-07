import Controller from './controller'

class Route {
  constructor (router, responder, passport) {
    this.$type = 'User'
    this.controller = new Controller(passport.jwtOptions)
    this.router = router
    this.responder = responder
    this.passport = passport

    this.init()
  }

  login (req, res) {
    return this.controller.login(req.body)
      .then(r => res.json(this.responder.success(req.__(`${this.$type} logged in successfully`, { type: this.type }), r)))
      .catch(e => res.json(this.responder.error(req.__(`${this.$type} could not login`, { type: this.type }), e)))
  }

  init () {
    this.router.post('/login', this.login.bind(this))
  }
}

export default Route
