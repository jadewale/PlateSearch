import React from 'react'
import { Link } from 'react-router-dom'

class SignUp extends React.Component {

  onChange = (e) => {
    let data = this.state.form
    data[e.target.name] = e.target.value
    this.setState({form: data})
  }
  onSignIn = (e) => {
    e.preventDefault()
    this.setState({error: ''})
    let email = this.state.form.email
    let password = this.state.form.password
    if ((email && email === 'oliver@admin.com') && (password && password === 'password')) {
      localStorage.setItem('admin', 'Logged')
      this.props.history.push('/dashboard')
    } else {
      this.setState({error: 'Invalid Email or Password'})
    }

  }

  constructor (props) {
    super(props)
    this.state = {
      form: {},
      error: '',
    }
    localStorage.clear()
  }

  render () {
    return (
      <div className="hold-transition">
        <div className="register-box">
          <div className="register-logo">
            <a href="../../index2.html"><b>Plate</b>ME</a>
          </div>

          <div className="register-box-body">
            <p className="login-box-msg">Admin Member</p>

            <form onSubmit={this.onSignIn}>
              <div className="form-group has-feedback">
                <input type="email" name="email" onChange={this.onChange} className="form-control" placeholder="Email"/>
                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
              </div>
              <div className="form-group has-feedback">
                <input type="password" name="password" onChange={this.onChange} className="form-control"
                       placeholder="Password"/>
                <span className="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <div className="row">
                <div className="col-xs-4">
                  <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                </div>
              </div>
              <span className="error-content">{this.state.error}</span>
            </form>
            <Link to="/login" className="text-center">Return to Default User</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp
    