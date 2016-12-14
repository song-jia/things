let babelSettings = {
  presets:['es2017']
}
// if (process.env.NODE_ENV == 'test') {
//   babelSettings['sourceMap'] = 'inline'
//   babelSettings['compact'] = false
//   babelSettings['cache'] = false
// }

require('babel-register')(babelSettings)
const app = require('./app')
const config = require('./config')

console.log('listen on port:' + config.LISTEN_PORT)
module.exports = app.listen(config.LISTEN_PORT)
