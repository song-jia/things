import React from 'react'
import LoginForm from 'routes/Login/components/LoginForm'
import { shallow } from 'enzyme'

describe('(View) Login Form', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<LoginForm />)
  })

  it('Renders a login form', () => {
    const idInput = wrapper.find('#user')
    const passInput = wrapper.find('#password')
    const loginBtn = wrapper.find('.login-form-button')
    expect(idInput).to.exist
    expect(passInput).to.exist
    expect(loginBtn).to.exist
  })

  it('Should show error when submit empty user and password', () => {
    const eventObj = {
      preventDefault: sinon.spy()
    }
    wrapper.find('Form').simulate('submit', eventObj)
    expect(eventObj.preventDefault.calledOnce).to.be.true
    const userGroup = wrapper.find('.userGroup')
    expect(userGroup.prop('help')).to.contain('请输入用户名。')
    const passwordGroup = wrapper.find('.passwordGroup')
    expect(passwordGroup.prop('help')).to.contain('请输入密码。')
  })

  it('should save user ID in state when it has been changed.', () => {
    wrapper.find('#user').simulate('change', {target: {value: 'user name'}})
    expect(wrapper.state('user')).to.equal('user name')
  })

  it('should save password in state when it has been changed.', () => {
    wrapper.find('#password').simulate('change', {target: {value: '111111'}})
    expect(wrapper.state('password')).to.equal('111111')
  })

  it('should dispatch authenticate action when submit form.', () => {
    const authAction = sinon.spy()
    const eventObj = {preventDefault: sinon.spy()}
    wrapper.setProps({authenticate: authAction})
    wrapper.setState({user: 'test', password: '111111'})
    wrapper.find('Form').simulate('submit', eventObj)
    expect(authAction.withArgs('test', '111111').calledOnce).to.be.true
  })
})
