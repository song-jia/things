/*
 * 用户验证controller，处理用户登录，登出的请求。
 * 退出处理：
 * 客户端需要通过DELETE方法访问该接口，如果request header中的JWT有效则删除服务器中的authID,从而使
 * 该JWT永久失效。
 * 如果JWT无效则忽略请求。
*/
var bodyParser = require('co-body')
var config = require('../config')
var jwt = require('koa-jwt')
var userRepo = require('../repositories/user')
var authModel = require('../models/auth')

/*
 * 登录处理：
 * 客户端需要通过POST方法发送username和password, 服务器端验证username和password。
 * 如果验证通过服务器返回JWT，其中包含过期时间和authID。
 * 如果验证失败，返回401状态和错误信息。
*/
module.exports.post = function * () {
  var req = yield bodyParser.form(this)
  var user = yield userRepo.findByName(req.username)
  if (user.length === 0) {
    this.status = 401
    this.body = 'user does not exist.'
  } else if (user[0].password !== req.password) {
    this.status = 401
    this.body = 'password is not correct.'
  } else {
    var authID = authModel.newID(user.id)
    this.status = 200
    this.body = {
      status: 'success',
      token: jwt.sign(
        {userID: user.id, authID: authID},
        config.JWT_KEY
      )
    }
  }
}

module.exports.delete = function * () {

}
