/*
 * 使用用户名查询用户信息。
 */
const monk = require('monk')
const wrap = require('co-monk')
const db = require('../utils/db')
const users = wrap(db.get('users'))

module.exports.findByName = function * (name) {
  return yield users.find({name: name})
}

/**
 * @param userId String | ObjectId
 * @param loginInfo Object {loginTime: time string, device: device name}
 * @returns ObjectId
 */
module.exports.addLoginRecord = function * (userId, loginInfo) {
  const authNID = monk.id()
  let loginRecord = Object.assign(
    {authNID: authNID},
    loginInfo
  )
  yield users.update(
    {_id: userId},
    {
      $push: {
        loginRecord: loginRecord
      }
    }
  )
  return authNID
}
