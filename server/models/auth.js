let usersRepo = require('../repositories/users')

/**
 * 保存登录信息。
 * @param userId 用户ID
 * @param loginInfo 登录信息, 例如: 登录时间,设备信息等
 * @return ObjectId
 */
module.exports.saveLoginInfo = function * (userId, loginInfo) {
  let id = yield usersRepo.addLoginRecord(userId, loginInfo)
  return id.toHexString()
}
