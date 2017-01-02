import React from 'react'
import { Layout } from 'antd'
import Header from '../../components/Header'
import Sider from '../../components/Sider'
import './CoreLayout.scss'
import '../../styles/core.scss'

const { Content } = Layout

export const CoreLayout = ({ children }) => (
  <Layout>
    <Header />
    <Layout>
      <Sider />
      <Content>
        {children}
      </Content>
    </Layout>
  </Layout>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
