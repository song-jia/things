import React from 'react'
import { Header } from 'components/Header/Header'
import Logo from 'components/Header/Logo'
import { Link } from 'react-router'
import { shallow } from 'enzyme'
import {expect} from 'chai'

describe('(Component) Header', () => {
  let _wrapper
  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  describe('Tool links...', () => {
    it('renders Logo component', () => {
      expect(_wrapper.find(Logo)).to.have.length(1)
    })
    describe('when customer logged in.', () => {
      it('renders a logout link.', () => {
        _wrapper.setProps({loggedIn: true})
        expect(_wrapper.contains(
          <Link to='/logout' className='link'>退出</Link>
        )).to.be.true
      })
    })
    describe('when cutomer dees not log in.', () => {
      it('Should render a login link.', () => {
        _wrapper.setProps({loggedIn: false})
        expect(_wrapper.contains(
          <Link to='/login' className='link'>登录</Link>
        )).to.be.true
      })
    })
  })
})
