/*
 * 使用用户名查询用户信息。
 */
const monk = require('monk')
const db = require('../utils/db')
const users = db.get('users')

module.exports.findByName = async (name) => {
  return await users.find({name: name})
}

/**
 * @param userId String | ObjectId
 * @param loginInfo Object {loginTime: time string, device: device name}
 * @returns ObjectId
 */
module.exports.addLoginRecord = async (userId, loginInfo) => {
  const authNID = monk.id()
  let loginRecord = Object.assign(
    {authNID: authNID},
    loginInfo
  )
  await users.update(
    {_id: userId},
    {
      $push: {
        loginRecord: loginRecord
      }
    }
  )
  return authNID
}
