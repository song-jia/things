import React, {Component} from 'react'
import { Row, Col, Form, Icon, Input, Button, Alert, Spin } from 'antd'
import styles from './loginForm.css'
import validator from 'validator'

const FormItem = Form.Item

class LoginForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: '',
      userError: false,
      password: '',
      passwordError: false
    }
  }
  /**
   * 校验用户名，密码，提交登录。
   */
  handleSubmit (e) {
    e.preventDefault()
    if (this.validateFields()) {
      this.props.authenticate(this.state.user, this.state.password)
    }
  }

  render () {
    return (
      <Row type='flex' align='middle' justify='center' className={styles.content}>
        <Col xs={2} sm={4} md={6} lg={8} className={styles.section}>
          <h1 className={styles.title}>Things</h1>
          <div className={styles.noticeBox}>
          {
            this.props.authError
              ? <Alert message={this.props.authError} type='error' showIcon />
              : ''
          }
          </div>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormItem
              validateStatus={this.state.userError ? 'error' : ''}
              help={this.state.userError ? '请输入用户名。' : ''}>
              <Input
                addonBefore={<Icon type='user' />}
                placeholder='用户名'
                value={this.state.user}
                onChange={(e) => this.setState({user: e.target.value})} />
            </FormItem>
            <FormItem
              validateStatus={this.state.passwordError ? 'error' : ''}
              help={this.state.passwordError ? '请输入密码。' : ''}>
              <Input
                addonBefore={<Icon type='lock' />}
                type='password'
                placeholder='密码'
                value={this.state.password}
                onChange={(e) => this.setState({password: e.target.value})} />
            </FormItem>
            <FormItem>
              <Row>
                <Col md={5}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'>
                    登录
                  </Button>
                </Col>
                <Col md={6}>
                  {
                    this.props.fetching
                      ? <Spin size='small' />
                      : ''
                  }
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Col>
      </Row>
    )
  }
  /**
   * 校验输入信息是否完整。
   */
  validateFields () {
    let userError = validator.isEmpty(this.state.user)
    let passwordError = validator.isEmpty(this.state.password)
    this.setState({
      userError: userError,
      passwordError: passwordError})
    return !userError && !passwordError
  }
}

LoginForm.propTypes = {
  authenticate: React.PropTypes.func,
  authError: React.PropTypes.string,
  fetching: React.PropTypes.bool
}

export default LoginForm
