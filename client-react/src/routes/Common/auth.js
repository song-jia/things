export default {
  // 检查登陆状态。
  loggedIn: (state) => !!state.authentication.token
}
