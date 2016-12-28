import React from 'react'
import auth from '../Common/auth'

const Inbox = () => (
  <div className='duck'>
    <h1>Inbox</h1>
  </div>
)

export default (store) => ({
  component: Inbox,
  onEnter: (nextState, replace) => {
    // 如果未登录转到登录页面。
    if (!auth.loggedIn(store.getState())) {
      replace('/login')
    }
  }
})
