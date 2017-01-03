import React from 'react'
import { Col, Menu } from 'antd'
import './sider.scss'
const SubMenu = Menu.SubMenu

const Sider = (props) => (
  <Col span={4} className='layoutSider'>
    <Menu
      mode='inline'
      defaultOpenKeys={['actionSubMenu', 'projectSubMenu']}>
      <Menu.Item key='collection'>收集篮</Menu.Item>
      <SubMenu key='actionSubMenu' title={<span>行动</span>}>
        <Menu.Item key='allActions'>全部行动</Menu.Item>
        <Menu.Item key='nextAction'>下一步行动</Menu.Item>
        <Menu.Item key='somedayAction'>将来某时</Menu.Item>
      </SubMenu>
      <SubMenu key='projectSubMenu' title={<span>项目</span>}>
        <Menu.Item key='allProjects'>全部项目</Menu.Item>
        <Menu.Item key='1'>项目 1</Menu.Item>
        <Menu.Item key='2'>项目 2</Menu.Item>
        <Menu.Item key='3'>项目 3</Menu.Item>
        <Menu.Item key='4'>项目 4</Menu.Item>
        <Menu.Item key='5'>项目 5</Menu.Item>
        <Menu.Item key='6'>项目 6</Menu.Item>
      </SubMenu>
    </Menu>
  </Col>
)

export default Sider
