import Model from './model'

class Controller {
  getOne (id) {
    return Model
      .findById(id)
      .exec()
  }

  findOne (filter) {
    return Model
      .findOne(filter)
      .exec()
  }

  getAll () {
    return Model
      .find()
      .exec()
  }

  create (data) {
    return new Model(data)
      .save()
  }

  async update (id, data) {
    const entity = await this.getOne(id)

    if (entity) {
      const entity = await Model
        .findOneAndUpdate({ _id: id }, data, { new: true })
        .exec()

      return entity
    }
    throw Error(`ID ${id} not found`)
  }

  async delete (id) {
    const entity = await this.getOne(id)

    if (entity) {
      const entity = await Model
        .findOneAndRemove({ _id: id })
        .exec()

      return entity
    }
    throw Error(`ID ${id} not found`)
  }
}

export default Controller
