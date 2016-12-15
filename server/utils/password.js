/*
 * 用于加密密码字符串。
 */
const bcrypt = require('bcrypt-nodejs')
/*
 * 使用bcrypt-nodejs加密密码字符串。
 */
module.exports.encrypt = function encrypt (password) {
  return bcrypt.hashSync(password)
}
/*
 * 比较明文密码是否与加密hash相匹配。
 */
module.exports.compare = function compare (password, hash) {
  return bcrypt.compareSync(password, hash)
}
