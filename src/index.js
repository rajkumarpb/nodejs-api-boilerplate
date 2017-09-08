import path from 'path'
import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import initializeDb from './db'
import middleware from './middleware'
import api from './api'
import config from './config/index'
import Responder from './utilities/responder'
import Passport from './passport'
import i18n from 'i18n'

let passport = Passport(config)

i18n.configure({
  locales: ['en', 'pt'],
  directory: path.resolve(__dirname, './locales')
})

const app = express()
app.server = http.createServer(app)

// logger
app.use(morgan('dev'))

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
  limit: config.parser.bodyLimit
}))

app.use(bodyParser.urlencoded({
  extended: true,
  limit: config.parser.bodyLimit
}))

app.use(passport.initialize())

app.use(i18n.init)

// connect to db
initializeDb(config, db => {
  // internal middleware
  app.use(middleware({ config, db }))

  // welcome
  app.get('/', (req, res) =>
    res.send('Welcome to the jungle!'))

  // api
  app.use('/api', api({
    Responder, passport
  }))

  app.server.listen(config.port, () => {
    console.log(`Started on port ${app.server.address().port}`)
  })
})

export default app
