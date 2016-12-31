import React from 'react'

class Logout extends React.Component {
  componentWillMount () {
    this.props.logout()
    this.props.router.replace('/')
  }

  render () {
    return null
  }
}

Logout.propTypes = {
  logout: React.PropTypes.func,
  router: React.PropTypes.object
}

export default Logout
