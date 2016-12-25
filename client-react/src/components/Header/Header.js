import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Things</h1>
    <Link to='/login' activeClassName='route--active'>
      Login
    </Link>
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

export default Header
