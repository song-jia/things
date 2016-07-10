var koa = require('koa')
var router = require('./router')

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

app.use(router.routes())

// app.use(jwt({ secret: config.JWT_KEY }))

app.listen(4000)
