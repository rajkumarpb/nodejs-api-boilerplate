import UserController from '../user/controller'
import jwt from 'jsonwebtoken'

class Controller {
  constructor (jwtOptions) {
    this.controller = new UserController()
    this.jwtOptions = jwtOptions
  }

  async login ({ email, password }) {
    const user = await this.controller.findOne({ email })

    if (user) {
      if (user.comparePassword(password)) {
        return {
          token: jwt.sign({ _id: user._id }, this.jwtOptions),
          message: `User with email ${email} authenticated`
        }
      }
      throw Error(`User with email ${email} not authenticated`)
    } else {
      throw Error(`User with email ${email} not found`)
    }
  }
}

export default Controller
