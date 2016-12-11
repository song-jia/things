/*
 * 用户验证controller，处理用户登录，登出的请求。
 * 退出处理：
 * 客户端需要通过DELETE方法访问该接口，如果request header中的JWT有效则删除服务器中的authID,从而使
 * 该JWT永久失效。
 * 如果JWT无效则忽略请求。
*/
const bodyParser = require('co-body')
const config = require('../config')
const jwt = require('koa-jwt')
const usersRepo = require('../repositories/users')
const authModel = require('../models/auth')
const password = require('../utils/password')

/*
 * 登录处理：
 * 客户端需要通过POST方法发送username和password, 服务器端验证username和password。
 * 如果验证通过服务器返回JWT，其中包含过期时间和authID。同时在服务器端将本次登录记入历史。
 * 如果验证失败，返回401状态和错误信息。
*/
module.exports.post = function * () {
  const req = yield bodyParser.form(this)
  const user = yield usersRepo.findByName(req.username)
  // user does not exist.
  if (user.length === 0) {
    this.status = 401
    this.body = 'user does not exist.'
    return
  }

  if (passwordIsWrong(req.password, user[0].password)) {
    this.status = 401
    this.body = 'password is not correct.'
    return
  }

  const authId = yield authModel.saveLoginInfo(
    user[0]._id,
    {loginTime: Date.now(), device: req.device})
  this.status = 200
  this.body = {
    status: 'success',
    token: jwt.sign(
      {authId: authId},
      config.JWT_KEY
    )
  }
}

/**
 * 校验请求中的密码是否和数据库中相等。
 */
function passwordIsWrong (raw, hash) {
  return !password.compare(raw, hash)
}

module.exports.delete = function * () {

}
