/*
 * 使用用户名查询用户信息。
 */
const config = require('../config')
const monk = require('monk')
const wrap = require('co-monk')
const db = monk(config.DB_URL)
const users = wrap(db.get('users'))

module.exports.findByName = function * (name) {
  return yield users.find({name: name})
}
