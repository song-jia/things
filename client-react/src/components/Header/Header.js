import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Row, Col } from 'antd'
import Logo from './Logo'
import './Header.scss'

export const Header = (props) => (
  <Row className='layoutHeader'>
    <Col span={4}>
      <Logo />
    </Col>
    <Col span={20} className='links'>
      {
        props.loggedIn
          ? <Link to='/logout' className='link'>退出</Link>
          : <Link to='/login' className='link'>登录</Link>
      }
    </Col>
  </Row>
)

Header.propTypes = {
  loggedIn: React.PropTypes.bool
}

const mapStateToProps = (store) => ({
  loggedIn: !!store.authentication.token
})
export default connect(mapStateToProps)(Header)
