const koa = require('koa')
const router = require('./router')

const app = koa()

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
