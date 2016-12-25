import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

class AppContainer extends Component {

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} routes={routes} />
        </div>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  routes: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array]).isRequired,
  store: PropTypes.object.isRequired
}

export default AppContainer
