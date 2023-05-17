import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    hasError: '',
    errorMsg: '',
  }

  onFormSubmit = async e => {
    e.preventDefault()
    const {username, password} = this.state

    const apiUrl = 'https://apis.ccbp.in/login'
    const requestBody = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(requestBody),
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      this.onApiSuccess(data.jwt_token)
    } else {
      const error = await response.json()
      this.onApiFailure(error.error_msg)
    }
  }

  onApiSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 2})
    this.setState({
      username: '',
      password: '',
      hasError: false,
      errorMsg: '',
    })
    history.replace('/')
  }

  onApiFailure = errMsg => {
    this.setState({
      hasError: true,
      errorMsg: errMsg,
    })
  }

  handleInput = e => {
    if (e.target.id === 'username') {
      this.setState({
        username: e.target.value,
      })
    } else {
      this.setState({
        password: e.target.value,
      })
    }
  }

  render() {
    const {username, password, hasError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.onFormSubmit}>
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />

          <div className="form-item">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Username"
              onChange={this.handleInput}
              value={username}
            />
          </div>

          <div className="form-item">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Password"
              onChange={this.handleInput}
              value={password}
            />
          </div>

          <div className="form-item">
            <button className="login-btn" type="submit">
              Login
            </button>
          </div>
          {hasError && <p className="error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
