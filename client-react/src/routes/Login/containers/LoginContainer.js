import { connect } from 'react-redux'
import { authenticate } from '../../../store/authentication'
import LoginForm from '../components/LoginForm'

const mapDispatchToProps = {
  authenticate
}

const mapStateToProps = (state) => ({
  authError: state.authentication.error,
  fetching: state.authentication.fetching
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
