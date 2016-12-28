import fetch from 'isomorphic-fetch'
import queryString from 'query-string'
import {browserHistory} from 'react-router'
// =========================
// constants
// =========================
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_FAILED = 'AUTH_FAILED'
const FETCHING = 'FETCHING'
const LOGOUT = 'LOGOUT'
// =========================
// actions
// =========================
/**
 * async action
 * 校验用户。
 */
export const authenticate = (id, password) => {
  return (dispatch) => {
    dispatch(fetching())
    return fetch('api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: queryString.stringify({id, password})
    }).then((res) => {
      if (res.status === 200) {
        return res.json().then((ctx) => {
          if (ctx.status === 'success') {
            dispatch(authSuccess(id, ctx.token))
            browserHistory.push('/')
          } else if (ctx.error === '101') {
            dispatch(authFailed('用户不存在。'))
          } else if (ctx.error === '102') {
            dispatch(authFailed('密码不正确。'))
          } else {
            dispatch(authFailed('验证失败。'))
          }
        })
      } else {
        dispatch(authFailed('连接失败，请重试。'))
      }
    }).catch((reason) => {
      console.log(reason)
    })
  }
}
/**
 * 更新工作状态为正在读取。
 */
export const fetching = () => {
  return {
    type: FETCHING,
    payload: {}
  }
}

/**
 * 校验成功后记录登录状态。
 */
export const authSuccess = (user, token) => {
  return {
    type: AUTH_SUCCESS,
    payload: {user, token}
  }
}
/**
 * 校验失败，记录失败错误信息。
 */
export const authFailed = (error) => {
  return {
    type: AUTH_FAILED,
    payload: {error}
  }
}
/**
 * 退出。
 */
export const logout = () => {
  return {
    type: LOGOUT,
    payload: null
  }
}

// =========================
// Reducer
// =========================
const initialState = {
  token: '',
  user: null,
  failed: false,
  fetching: false,
  error: ''
}

function getInitState () {
  if (sessionStorage.getItem('auth')) {
    return JSON.parse(sessionStorage.getItem('auth'))
  }
  return initialState
}

export default function authenticationReducer (state = getInitState(), action) {
  switch (action.type) {
    case FETCHING:
      state = Object.assign(
        {},
        state,
        {fetching: true, error: ''})
      break
    case AUTH_SUCCESS:
      state = Object.assign(
        {},
        state,
        {token: action.payload.token, user: action.payload.user, fetching: false})
      saveAuthState(state)
      break
    case AUTH_FAILED:
      state = Object.assign(
        {},
        state,
        {failed: true, error: action.payload.error, fetching: false})
      break
    case LOGOUT:
      state = Object.assign(
        {},
        initialState
      )
      clearAuthState()
      break
  }
  return state
}
/**
 * 把登录状态存到SessionStorage中，登录状态在当前session有效。
 */
function saveAuthState (state) {
  sessionStorage.setItem('auth', JSON.stringify(state))
}

function clearAuthState () {
  sessionStorage.removeItem('auth')
}
