/*
 * 用户验证controller，处理用户登录，登出的请求。
 * 退出处理：
 * 客户端需要通过DELETE方法访问该接口，如果request header中的JWT有效则删除服务器中的authID,从而使
 * 该JWT永久失效。
 * 如果JWT无效则忽略请求。
*/
const config = require('../config')
const jwt = require('koa-jwt')
const usersRepo = require('../repositories/users')
const authModel = require('../models/auth')
const password = require('../utils/password')

/*
 * 登录处理：
 * 客户端需要通过POST方法发送id和password, 服务器端验证id和password。
 * 如果验证通过服务器返回JWT，其中包含过期时间和authID。同时在服务器端将本次登录记入历史。
 * 如果验证失败，返回401状态和错误信息。
*/
module.exports.auth = async (ctx) => {
  const body = ctx.request.body
  const user = await usersRepo.findByName(body.id)
  // user does not exist.
  if (user.length === 0) {
    ctx.status = 200
    ctx.body = {status: 'error', error: '101', errorMessage: 'user does not exist.'}
  // password is wrong.
  } else if (passwordIsWrong(body.password, user[0].password)) {
    ctx.status = 200
    ctx.body = {status: 'error', error: '102', errorMessage: 'password is not correct.'}
  // authN success, save auth record.
  } else {
    const authId = await authModel.saveLoginInfo(
      user[0]._id,
      {loginTime: Date.now(), device: body.device})
    ctx.response.status = 200
    ctx.response.body = {
      status: 'success',
      token: jwt.sign(
        {user: user[0].name, authID: authId},
        config.JWT_KEY,
        {expiresIn: '1d'}
      )
    }
  }
}

/*
 * 退出处理
 */
module.exports.logout = async (ctx) => {
  await usersRepo.removeLoginRecord(ctx.state.user.user, ctx.state.user.authID)
  ctx.status = 200
  ctx.body = 'logout success.'
}

module.exports.checkToken = async (ctx, next) => {
  let user = await usersRepo.getUserByLoginID(ctx.state.user.user, ctx.state.user.authID)
  if (user === null) {
    throw {status: 401}
  }
  await next()
}

/**
 * 校验请求中的密码是否和数据库中相等。
 */
function passwordIsWrong (raw, hash) {
  return !password.compare(raw, hash)
}

