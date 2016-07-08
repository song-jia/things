var koa = require('koa')
var route = require('koa-route')
var auth = require('./controllers/auth')
var app = koa()

app.use(route.get('/auth', auth.get))

app.listen(4000)
console.log('listening on http://localhost:4000')
