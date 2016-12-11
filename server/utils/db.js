const monk = require('monk')
const config = require('../config')
const db = monk(config.DB_URL)

module.exports = db
