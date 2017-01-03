import React from 'react'
import Logo from 'components/Header/Logo'
import { shallow } from 'enzyme'

describe('Logo component', () => {
  it('renders logo', () => {
    const wrapper = shallow(<Logo />)
    expect(wrapper.find('.logo')).to.have.length(1)
  })
})
