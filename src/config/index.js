const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  const config = require('./config.json')
  if (config) {
    Object.keys(config).forEach(key => {
      process.env[key] = config[key]
    })
  }
}

// Be sure to populate config.json
module.exports = {
  port: process.env.PORT || 3000,

  parser: {
    bodyLimit: '1024kb'
  },

  cors: {
    optionsSuccessStatus: 200,
    origin: [process.env.CORS_ORIGIN]
  },

  url: {
    api: process.env.API_URL,
    website: process.env.WEBSITE_URL
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    session: {
      session: false
    }
  },

  database: {
    mongo: {
      uri: process.env.DATABASE_MONGO_URI
    }
  },

  email: {
    from: process.env.EMAIL_FROM,
    mailer: {
      host: process.env.EMAIL_MAILER_HOST,
      port: process.env.EMAIL_MAILER_PORT,
      secure: (process.env.EMAIL_MAILER_PORT === 465),
      auth: {
        user: process.env.EMAIL_MAILER_AUTH_USER,
        pass: process.env.EMAIL_MAILER_AUTH_PASS
      }
    }
  }
}
