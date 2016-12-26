import React, {Component} from 'react'
import { Row, Col, Form, Icon, Input, Button } from 'antd'
import styles from './loginForm.css'
const FormItem = Form.Item

class LoginForm extends Component {
  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // },
  render () {
    return (
      <Row type='flex' align='middle' justify='center' className={styles.content}>
        <Col xs={2} sm={4} md={6} lg={8} className={styles.section}>
          <h1 className={styles.title}>Things</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <Input addonBefore={<Icon type='user' />} placeholder='Username' />
            </FormItem>
            <FormItem>
              <Input addonBefore={<Icon type='lock' />} type='password' placeholder='Password' />
            </FormItem>
            <FormItem>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                登录
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default LoginForm
