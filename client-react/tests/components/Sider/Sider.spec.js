import React from 'react'
import Sider from 'components/Sider/Sider'
import { shallow } from 'enzyme'
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu

describe('Sider component', () => {
  it('renders menu', () => {
    const wrapper = shallow(<Sider />)
    expect(wrapper.find(Menu)).to.have.length(1)
  })
  describe('Menu', () => {
    const wrapper = shallow(<Sider />)
    const MenuNode = wrapper.find(Menu)
    it('contains collection, actions, projects', () => {
      expect(MenuNode.contains(<Menu.Item key='collection'>收集篮</Menu.Item>)).to.be.true
      expect(MenuNode.contains(
        <SubMenu key='actionSubMenu' title={<span>行动</span>}>
          <Menu.Item key='allActions'>全部行动</Menu.Item>
          <Menu.Item key='nextAction'>下一步行动</Menu.Item>
          <Menu.Item key='somedayAction'>将来某时</Menu.Item>
        </SubMenu>)).to.be.true
      expect(MenuNode.contains(
        <SubMenu key='projectSubMenu' title={<span>项目</span>}>
          <Menu.Item key='allProjects'>全部项目</Menu.Item>
          <Menu.Item key='1'>项目 1</Menu.Item>
          <Menu.Item key='2'>项目 2</Menu.Item>
          <Menu.Item key='3'>项目 3</Menu.Item>
          <Menu.Item key='4'>项目 4</Menu.Item>
          <Menu.Item key='5'>项目 5</Menu.Item>
          <Menu.Item key='6'>项目 6</Menu.Item>
        </SubMenu>)).to.be.true
    })
  })
})
