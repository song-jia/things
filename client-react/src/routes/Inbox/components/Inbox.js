import React from 'react'
import { Table, Button, Checkbox } from 'antd'
import ItemEditor from './ItemEditor'
import './inbox.scss'

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

class Inbox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showEditor: false
    }
  }
  render () {
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
            <Button icon='delete' /> <Button icon='edit' onClick={() => this.showEditor()} />
          </span>
        )
      }
    ]

    return (
      <div className='inbox'>
        <div className='toolbar'>
          <Button icon='plus-circle-o' onClick={() => this.showEditor()}>添加</Button>
        </div>
        <div className='list'>
          <Table columns={columns} dataSource={data} />
        </div>
        <ItemEditor
          title='时事件'
          showEditor={this.state.showEditor}
          close={() => this.closeEditor()} />
      </div>
    )
  }
  showEditor () {
    this.setState({
      showEditor: true
    })
  }
  closeEditor () {
    this.setState({
      showEditor: false
    })
  }
}

export default Inbox
