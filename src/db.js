import mongoose from 'mongoose'
import config from './config.json'

export default (callback) => {
  mongoose.Promise = global.Promise

  mongoose.connect(
    `mongodb://${config.mongo.path}/${config.mongo.database}`,
    {
      useMongoClient: true
    }
  )
    .then(() => callback(mongoose))
    .catch(err => console.error(err))
}
