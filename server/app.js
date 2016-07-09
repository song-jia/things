var koa = require('koa')
var jwt = require('koa-jwt')
var config = require('./config')

var app = koa()
module.exports = app

app.use(function * (next) {
  try {
    yield next
  } catch (err) {
    if (err.status === 401) {
      this.status = 401
      this.body = 'permission denied.'
      console.log(err.message)
    }
  }
})

app.use(jwt({ secret: config.JWT_KEY }))
app.use(function * () {
  this.body = 'hello'
})

app.listen(4000)
