import React from 'react'
import { Table, Button, Checkbox, Modal, Form, Input } from 'antd'
import './inbox.scss'
const FormItem = Form.Item

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
        <Modal
          title='新事件'
          visible={this.state.showEditor}
          okText='保存'
          onOk={() => this.closeEditor()}
          confirmLoading={this.state.confirmLoading}
          onCancel={() => this.closeEditor()}
        >
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormItem
              className=''>
              <Input
                id='title'
                placeholder='新事件'
                value={this.state.title}
                onChange={(e) => this.setState({user: e.target.value})} />
            </FormItem>
          </Form>
        </Modal>
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
