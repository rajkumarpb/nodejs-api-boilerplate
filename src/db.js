import mongoose from 'mongoose'

export default (config, callback) => {
  mongoose.Promise = global.Promise

  mongoose.connect(
    `${config.database.mongo.uri}`,
    {
      useMongoClient: true
    }
  )
    .then(() => callback(mongoose))
    .catch(err => console.error(err))
}
