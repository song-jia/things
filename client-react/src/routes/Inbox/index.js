import Inbox from './containers/Inbox'

export default (store) => ({
  component: Inbox,
  onEnter: (nextState, replace) => {
    // 如果未登录转到登录页面。
    let state = store.getState()
    if (!state.authentication.token) {
      replace('/login')
    }
  }
})
