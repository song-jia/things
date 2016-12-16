const router = require('koa-router')
const auth = require('./controllers/auth')

const protectedAPI = router()
const unprotected = router()

unprotected.get('/', (ctx) => {
  ctx.body = 'APP homepage.'
})
// 验证接口，功能：
// 用户名，密码验证。
unprotected.post('/api/auth', auth.auth)

// 退出
protectedAPI.del('/api/auth', auth.logout)
module.exports.protected = protectedAPI
module.exports.unprotected = unprotected
