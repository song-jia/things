import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { Layout } from 'antd'
import './Header.scss'

const AntdHeader = Layout.Header

export const Header = (props) => (
  <AntdHeader className='header'>Header</AntdHeader>
)
//  (props) => (
//   <div>
//     <h1>Things</h1>
//     {
//       props.loggedIn
//         ? <Link to='/logout' activeClassName='route--active'>退出</Link>
//         : <Link to='/login' activeClassName='route--active'>登录</Link>
//     }
//     {' · '}
//     <IndexLink to='/' activeClassName='route--active'>
//       工作篮
//     </IndexLink>
//     {' · '}
//     <Link to='/actions' activeClassName='route--active'>
//       下一步行动
//     </Link>
//     {' · '}
//     <Link to='/projects' activeClassName='route--active'>
//       项目
//     </Link>
//     {' · '}
//     <Link to='/tags' activeClassName='route--active'>
//       标签
//     </Link>
//   </div>
// )

AntdHeader.propTypes = {
  loggedIn: React.PropTypes.bool
}

const mapStateToProps = (store) => ({
  loggedIn: !!store.authentication.token
})
export default connect(mapStateToProps)(Header)
