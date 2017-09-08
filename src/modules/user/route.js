import Controller from './controller'

class Route {
  constructor (router, responder, passport) {
    this.type = 'User'
    this.controller = new Controller()
    this.router = router
    this.responder = responder
    this.passport = passport

    this.init()
  }

  getOne (req, res) {
    return this.controller.getOne(req.param.id)
      .then(r => res.json(this.responder.success(req.t('{{type}} retrieved successfully', { type: this.type }), r)))
      .catch(e => res.json(this.responder.error(req.t('{{type}} not retrieved', { type: this.type }), e)))
  }

  getAll (req, res) {
    return this.controller.getAll()
      .then(r => res.json(this.responder.success(req.t('{{type}} retrieved successfully', { type: this.type }), r)))
      .catch(e => res.json(this.responder.error(req.t('{{type}} not retrieved', { type: this.type }), e)))
  }

  create (req, res) {
    return this.controller.create(req.body)
      .then(r => res.json(this.responder.success(req.t('{{type}} created successfully', { type: this.type }), r)))
      .catch(e => res.json(this.responder.error(req.t('{{type}} not created', { type: this.type }), e)))
  }

  update (req, res) {
    return this.controller.update(req.params.id, req.body)
      .then(r => res.json(this.responder.success(req.t('{{type}} updated successfully', { type: this.type }), r)))
      .catch(e => res.json(this.responder.error(req.t('{{type}} not updated', { type: this.type }), e)))
  }

  delete (req, res) {
    return this.controller.delete(req.params.id)
      .then(r => res.json(this.responder.success(req.t('{{type}} removed successfully', { type: this.type }), r)))
      .catch(e => res.json(this.responder.error(req.t('{{type}} not removed', { type: this.type }), e)))
  }

  init () {
    this.router.get('/:id', this.getOne.bind(this))
    this.router.get('/', this.getAll.bind(this))
    this.router.post('/', this.create.bind(this))
    this.router.patch('/:id', this.passport.authenticate('jwt'), this.update.bind(this))
    this.router.delete('/:id', this.delete.bind(this))
  }
}

export default Route
