const router = require('koa-router')
const auth = require('./controllers/auth')
const stuffs = require('./controllers/stuffs')

// 不需要登录才能访问的API
const unprotected = router()
unprotected.get('/', (ctx) => {
  ctx.body = 'APP homepage.'
})
// 登录
unprotected.post('/api/auth', auth.auth)

// 需要登录才能访问的API
const protectedAPI = router()
// 退出
protectedAPI.del('/api/auth', auth.logout)
// stuffs
protectedAPI.get('/api/stuffs', stuffs.all)
protectedAPI.post('/api/stuffs', stuffs.new)
protectedAPI.put('/api/stuffs', stuffs.update)
protectedAPI.del('/api/stuffs', stuffs.remove)

module.exports.protected = protectedAPI
module.exports.unprotected = unprotected
