const router = require('koa-router')()
const auth = require('./controllers/auth')

router.get('/', function * () {
  this.body = 'welcome'
})
// 验证接口，功能：
// 用户名，密码验证。
router.post('/api/auth', auth.post)

module.exports = router
