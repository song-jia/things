const app = require('./app')
const config = require('./config')

console.log('listen on port:' + config.LISTEN_PORT)
module.exports = app.listen(config.LISTEN_PORT)
