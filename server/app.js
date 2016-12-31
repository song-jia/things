const Koa = require('koa')
const config = require('./config')
const jwt = require('koa-jwt')
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const auth = require('./controllers/auth')

const app = new Koa()

module.exports = app

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = 'permission denied.'
      console.log(err.message)
    }
  }
})

app.use(bodyParser())

app.use(router.unprotected.routes())
// JWT token校验控件，如果校验失败，下面的中间件都不会执行。
app.use(convert(jwt({secret: config.JWT_KEY})))
app.use(auth.checkToken)
app.use(router.protected.routes())
