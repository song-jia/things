import React from 'react'
import { Header } from 'components/Header/Header'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'
import {expect} from 'chai'

describe('(Component) Header', () => {
  let _wrapper
  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Inbox route', () => {
      expect(_wrapper.contains(
        <IndexLink activeClassName='route--active' to='/'>
          工作篮
        </IndexLink>
      )).to.be.true
    })
  })
})
