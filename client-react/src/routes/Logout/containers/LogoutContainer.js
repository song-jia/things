import { connect } from 'react-redux'
import { logout } from '../../../store/authentication'
import LogoutPage from '../components/Logout'

const mapDispatchToProps = {
  logout
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.authentication.token
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)
