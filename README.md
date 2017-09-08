Nodejs API Boilerplate
==================================

Simple NodeJS API boilerplate to quickstart my projects

- ES6 support via [babel](https://babeljs.io)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- Internationalization via [i18n](https://github.com/mashpie/i18n-node)
- Auth via [passport](https://github.com/jaredhanson/passport) and [passport-jwt](https://github.com/themikenicholson/passport-jwt)

## Config

The config folder contains an index.js which will set all the necessary config keys.
It was designed with Heroku deploy in mind where all the process.env[key] are set within the settings area of Heroku.
To overwrite the values duplicate config.json.example and set the keys.
