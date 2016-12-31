import inboxRoute from 'routes/Inbox'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('Route of Inbox.', () => {
  describe('when customer does not login.', () => {
    it('should goto login panel.', () => {
      let route = inboxRoute(mockStore({authentication: {token: ''}}))
      const replace = sinon.spy()
      route.onEnter({}, replace)
      expect(replace.withArgs('/login').calledOnce).to.be.true
    })
  })
})
