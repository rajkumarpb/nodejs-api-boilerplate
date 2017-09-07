import model from './model'

class Controller {
  constructor () {}

  getOne (id) {
    return model
      .findById(id)
      .exec()
  }

  findOne (filter) {
    return model
      .findOne(filter)
      .exec()
  }

  getAll () {
    return model
      .find()
      .exec()
  }

  create (data) {
    return new model(data)
      .save()
  }

  async update (id, data) {
    let entity = await this.getOne(id)

    if (entity) {
      let entity = await model
        .findOneAndUpdate({ _id: id }, data, { new: true })
        .exec()

      return entity
    } else {
      throw Error (`ID ${id} not found`)
    }
  }

  async delete (id) {
    let entity = await this.getOne(id)
    
    if (entity) {
      let entity = await model
        .findOneAndRemove({ _id: id })
        .exec()

      return entity
    } else {
      throw Error (`ID ${id} not found`)
    }
  }
}

export default Controller