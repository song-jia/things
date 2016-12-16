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
    {id: authNID},
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

module.exports.removeLoginRecord = (name, authID) => {
  return users.update(
    {name: name},
    {
      $pull: {loginRecord: {id: authID}}
    }
  )
}

module.exports.getUserByLoginID = (name, authID) => {
  return users.findOne({name: name, loginRecord:{id: authID}})
}
