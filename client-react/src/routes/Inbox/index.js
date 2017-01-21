import React from 'react'
import { Table, Button, Checkbox } from 'antd'
import './inbox.scss'

const columns = [
  {
    width: '30',
    render: () => <Checkbox />
  },
  {
    title: '收集篮',
    dataIndex: 'title',
    key: 'title',
    render: text => <span>{text}</span>
  },
  {
    width: '80',
    render: (text, record) => (
      <span>
        <Button icon='delete' /> <Button icon='edit' />
      </span>
    )
  }
]

const data = stubItems(35)

function stubItems (number) {
  let i = 0
  let result = []
  while (i < number) {
    result[i] = {key: i + 1, title: 'stuff ' + (i + 1)}
    i++
  }
  return result
}

const Inbox = () => (
  <div className='inbox'>
    <div className='toolbar'>
      <Button icon='plus-circle-o'>添加</Button>
    </div>
    <div className='list'>
      <Table columns={columns} dataSource={data} />
    </div>
  </div>
)

export default (store) => ({
  component: Inbox,
  onEnter: (nextState, replace) => {
    // 如果未登录转到登录页面。
    let state = store.getState()
    if (!state.authentication.token) {
      replace('/login')
    }
  }
})
