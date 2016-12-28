import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = (props) => (
  <div>
    <h1>Things</h1>
    {
      props.loggedIn
        ? <Link to='/logout' activeClassName='route--active'>退出</Link>
        : <Link to='/login' activeClassName='route--active'>登录</Link>
    }
    {' · '}
    <IndexLink to='/' activeClassName='route--active'>
      Inbox
    </IndexLink>
    {' · '}
    <Link to='/actions' activeClassName='route--active'>
      Actions
    </Link>
    {' · '}
    <Link to='/projects' activeClassName='route--active'>
      Projects
    </Link>
    {' · '}
    <Link to='/tags' activeClassName='route--active'>
      Tags
    </Link>
  </div>
)

Header.propTypes = {
  loggedIn: React.PropTypes.bool
}

const mapStateToProps = (store) => ({
  loggedIn: !!store.authentication.token
})
export default connect(mapStateToProps)(Header)
