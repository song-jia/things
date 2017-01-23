import React from 'react'
import { Form, Input, Modal } from 'antd'
const FormItem = Form.Item

class ItemEditor extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      title: props.title
    }
  }

  render () {
    return (
      <Modal
        title='新事件'
        visible={this.props.showEditor}
        okText='保存'
        onOk={() => this.handleSubmit()}
        confirmLoading={this.state.confirmLoading}
        onCancel={() => this.cancelHandler()}
        maskClosable={false}
      >
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <FormItem
            className=''>
            <Input
              id='title'
              placeholder='新事件'
              value={this.state.title}
              onChange={(e) => this.setState({title: e.target.value})} />
          </FormItem>
        </Form>
      </Modal>
    )
  }

  handleSubmit () {
    this.props.close()
  }

  cancelHandler () {
    this.props.close()
  }
}

ItemEditor.propTypes = {
  title: React.PropTypes.string,
  showEditor: React.PropTypes.bool,
  close: React.PropTypes.func
}

export default ItemEditor
