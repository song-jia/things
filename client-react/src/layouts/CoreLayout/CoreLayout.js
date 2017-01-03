import React from 'react'
import { Row, Col } from 'antd'
import Header from '../../components/Header'
import Sider from '../../components/Sider'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='coreLayout'>
    <Header />
    <Row className='layoutMain'>
      <Sider />
      <Col className='layoutContent' span={20}>
        {children}
      </Col>
    </Row>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
