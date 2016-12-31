import React from 'react'
import Logout from 'routes/Logout/components/Logout'
import { shallow } from 'enzyme'

describe('Logout component', () => {
  describe('when the component will be mounted', () => {
    const logout = sinon.spy()
    const router = {
      replace: sinon.spy()
    }
    shallow(<Logout logout={logout} router={router} />)
    it('should dispatch logout action', () => {
      expect(logout.calledOnce).to.be.true
    })
    it('should redirect to \'/\'', () => {
      expect(router.replace.withArgs('/').calledOnce).to.be.true
    })
  })
})
