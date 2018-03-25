import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { updateAdminSignUp } from '../../actions';
import { makeSelector } from '../../selector';

class SignUp extends Component {
  signUpForm = (evt) => {
    evt.preventDefault();
    const { email, password } = this.props.admin.adminProfile;

    if (email === 'jolaade@yahoo.com' && password === 'tester') {
      this.props.updateSignUp('error', '');
      this.props.signUpSuccess();
      return;
    }
    this.props.updateSignUp('error', 'Invalid Email or Password');
  };

  updateForm = (evt) => {
    const keyPath = evt.target.name;
    const { value } = evt.target;
    this.props.updateSignUp(keyPath, value);
  };

  render() {
    return (
      <SignUpForm
        updateForm={this.updateForm}
        signUp={this.signUpForm}
        error={(this.props.admin) ?
          this.props.admin.adminProfile.error : ''
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return makeSelector(state);
}

function mapDispatchToProps(dispatch) {
  return {
    signUpSuccess: () => dispatch(push('/dashboard')),
    updateSignUp: (keyPath, value) =>
      dispatch(updateAdminSignUp(keyPath, value)),
  };
}

SignUp.propTypes = {
  signUpSuccess: PropTypes.func.isRequired,
  updateSignUp: PropTypes.func.isRequired,
  admin: PropTypes.shape({
    adminProfile: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      error: PropTypes.string,
    }),
  }).isRequired,
};

const SignUpForm = ({ updateForm, signUp, error }) => (
  <div className="hold-transition">
    <div className="register-box">
      <div className="register-logo">
        <a href=""><b>Plate</b>ME</a>
      </div>

      <div className="register-box-body">
        <p className="login-box-msg">
          { error ?
            <span className="error-content small text-danger">{error}</span> : 'Admin Member'
          }
        </p>

        <form onSubmit={signUp}>
          <div className="form-group has-feedback">
            <input type="email" name="email" onChange={updateForm} className="form-control" placeholder="Email" />
            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              name="password"
              onChange={updateForm}
              className="form-control"
              placeholder="Password"
            />
            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div className="row">
            <div className="col-xs-4">
              <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
            </div>
            <div className="col-xs-8 col-md-6">

            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-xs-12 text-center">
            <Link to="/login" href="/login" className="text-center">Return to Default User</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

SignUpForm.propTypes = {
  error: PropTypes.string,
  signUp: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
