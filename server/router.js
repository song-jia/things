var router = require('koa-router')()
var auth = require('./controllers/auth')

router.get('/', function * () {
  this.body = 'welcome'
})

router.post('/api/auth', auth.post)

module.exports = router
