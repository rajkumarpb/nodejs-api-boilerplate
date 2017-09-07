import { version } from '../../package.json'
import { Router } from 'express'
import User from '../modules/user/index'
import Auth from '../modules/auth/index'

export default ({ config, db, responder, passport }) => {
	let api = Router();

	// create the objects
	const auth = new Auth(Router(), responder, passport)
	const user = new User(Router(), responder, passport)

	// mount the modules
	api.use('/auth', auth.router)
	api.use('/users', user.router)
	

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version })
	})

	return api
}
