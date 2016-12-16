const path = require('path')

const config = {
  context: path.resolve([__dirname, '../src']),
  entry: './main',
  output: {
    path: path.resolve([__dirname, '/dist']),
    filename: 'bundle.js'
  }
}

module.exports = config
