import * as authModule from 'store/authentication'
// import nock from 'nock'
// import thunk from 'redux-thunk'
// import configureStore from 'redux-mock-store'

// const middlewares = [thunk]
// const mockStore = configureStore(middlewares)

describe('Authentication module', () => {
  const auth = authModule.default
  describe('Reducer', () => {
    it('should be a function', () => {
      expect(auth).is.a('function')
    })
    it('should initial state', () => {
      let state = auth()
      expect(state).to.deep.equal({
        token: '',
        user: null,
        failed: false,
        fetching: false,
        error: ''
      })
    })
    it('should log fetching status when receive FETCHING action.', () => {
      let state = auth({}, {type: 'FETCHING'})
      expect(state.fetching).to.be.true
    })
    it('should log authentication details when receive AUTH_SUCCESS action.', () => {
      let state = auth({}, {type: 'AUTH_SUCCESS', payload: {token: 'auth_token', user: 'test'}})
      expect(state).to.deep.equal({user: 'test', token: 'auth_token', fetching: false})
    })
    it('should log error details when receive AUTH_FAILED action.', () => {
      let state = auth({}, {type: 'AUTH_FAILED', payload: {error: 'log in failed.'}})
      expect(state).to.deep.equal({
        failed: true,
        fetching: false,
        error: 'log in failed.'})
    })
    it('should clean authentication details when receive LOGOUT action.', () => {
      let state = auth({}, {type: 'LOGOUT', payload: {}})
      expect(state).to.deep.equal({
        token: '',
        user: null,
        failed: false,
        fetching: false,
        error: ''})
    })
  })
  describe('Action Creator', () => {
    it('Creates FETCHING Action', () => {
      const action = authModule.fetching()
      expect(action).to.deep.equal({type: 'FETCHING', payload: {}})
    })
    it('Creates AUTH_SUCCESS Action', () => {
      const action = authModule.authSuccess('user', 'auth_token')
      expect(action).to.deep.equal({type: 'AUTH_SUCCESS', payload: {user: 'user', token: 'auth_token'}})
    })
    it('Creates AUTH_FAILED Action', () => {
      const action = authModule.authFailed('login error')
      expect(action).to.deep.equal({type: 'AUTH_FAILED', payload: {error: 'login error'}})
    })
    it('Creates LOGOUT Action', () => {
      const action = authModule.logout()
      expect(action).to.deep.equal({type: 'LOGOUT', payload: null})
    })
  })
  // describe('Async Action Creator', () => {
  //   it('Creates authenticate action', () => {
  //     const store = mockStore({})
  //     return store.dispatch(authModule.authenticate('user', '111111'))
  //       .then(() => {
  //         const actions = store.getActions()
  //         expect(actions[0]).to.equal(authModule.fetching())
  //       })
  //   })
  // })
})
