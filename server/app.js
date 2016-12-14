const Koa = require('koa')
const router = require('./router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

module.exports = app

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      this.status = 401
      this.body = 'permission denied.'
      console.log(err.message)
    }
  }
})

app.use(bodyParser());
app.use(router.routes())
