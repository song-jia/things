import * as authModule from 'store/authentication'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Authentication module', () => {
  const auth = authModule.default
  describe('Reducer', () => {
    it('should be a function', () => {
      expect(auth).is.a('function')
    })
    describe('when receive empty action', () => {
      const initialState = {
        token: '',
        user: null,
        failed: false,
        fetching: false,
        error: ''
      }
      describe('when state had been saved in sessionStorage', () => {
        it('should load state form seesionStorage', () => {
          sessionStorage.setItem('auth', JSON.stringify(initialState))
          expect(auth(undefined, {})).to.deep.equal(initialState)
        })
      })
      describe('when sessionStorage don\'t have state', () => {
        it('should return initial state.', () => {
          let state = auth(undefined, {})
          expect(state).to.deep.equal(initialState)
        })
      })
    })
    describe('when receive FETCHING action.', () => {
      it('should log fetching status.', () => {
        let state = auth({}, {type: 'FETCHING'})
        expect(state.fetching).to.be.true
      })
    })
    describe('when receive AUTH_SUCCESS action.', () => {
      it('should log authentication details.', () => {
        let state = auth({}, {type: 'AUTH_SUCCESS', payload: {token: 'auth_token', user: 'test'}})
        expect(state).to.deep.equal({user: 'test', token: 'auth_token', fetching: false})
      })
    })
    describe('when receive AUTH_FAILED action.', () => {
      it('should log error details.', () => {
        let state = auth({}, {type: 'AUTH_FAILED', payload: {error: 'log in failed.'}})
        expect(state).to.deep.equal({
          failed: true,
          fetching: false,
          error: 'log in failed.'})
      })
    })
    describe('when receive LOGOUT action.', () => {
      it('should clean authentication details.', () => {
        let state = auth({}, {type: 'LOGOUT', payload: {}})
        expect(state).to.deep.equal({
          token: '',
          user: null,
          failed: false,
          fetching: false,
          error: ''})
      })
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
  describe('Async authenticate action Creator', () => {
    afterEach(() => {
      fetchMock.restore()
    })
    describe('when authenticate with correct id and password', () => {
      it('should dispatch AUTH_SUCCESS action.', () => {
        fetchMock.post(
          (url, opts) => {
            expect(url).to.equal('/api/auth')
            expect(opts.body).to.equal('id=user&password=111111')
            return true
          }, {status: 200, body: {status: 'success', token: 'auth-token'}})
        const store = mockStore({})

        return store.dispatch(authModule.authenticate('user', '111111'))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0]).to.deep.equal(authModule.fetching())
            expect(actions[1]).to.deep.equal(authModule.authSuccess('user', 'auth-token'))
          })
      })
    })
    describe('when authenticate with invalid id.', () => {
      it('should dispatch AUTH_FAILED action.', () => {
        fetchMock.post(
          (url, opts) => {
            expect(url).to.equal('/api/auth')
            expect(opts.body).to.equal('id=invalid&password=111111')
            return true
          }, {status: 200, body: {error: '101'}})
        const store = mockStore({})
        return store.dispatch(authModule.authenticate('invalid', '111111'))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0]).to.deep.equal(authModule.fetching())
            expect(actions[1]).to.deep.equal(authModule.authFailed('用户不存在。'))
          })
      })
    })
    describe('when authenticate with invalid password.', () => {
      it('should dispatch AUTH_FAILED action.', () => {
        fetchMock.post(
          (url, opts) => {
            expect(url).to.equal('/api/auth')
            expect(opts.body).to.equal('id=user&password=invalid')
            return true
          }, {status: 200, body: {error: '102'}})
        const store = mockStore({})
        return store.dispatch(authModule.authenticate('user', 'invalid'))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0]).to.deep.equal(authModule.fetching())
            expect(actions[1]).to.deep.equal(authModule.authFailed('密码不正确。'))
          })
      })
    })
    describe('when authenticate failed with unknow reason.', () => {
      it('should dispatch AUTH_FAILED action.', () => {
        fetchMock.post(
          (url, opts) => {
            expect(url).to.equal('/api/auth')
            expect(opts.body).to.equal('id=user&password=invalid')
            return true
          }, {status: 200, body: {error: '500'}})
        const store = mockStore({})
        return store.dispatch(authModule.authenticate('user', 'invalid'))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0]).to.deep.equal(authModule.fetching())
            expect(actions[1]).to.deep.equal(authModule.authFailed('验证失败。'))
          })
      })
    })
    describe('when fail to connect to server.', () => {
      it('should dispatch AUTH_FAILED action.', () => {
        const store = mockStore({})
        return store.dispatch(authModule.authenticate('user', '111111'))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0]).to.deep.equal(authModule.fetching())
            expect(actions[1]).to.deep.equal(authModule.authFailed('连接失败，请重试。'))
          })
      })
    })
  })
})
