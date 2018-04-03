import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from './Login/index';
import { googleSignIn, facebookSignIn } from '../actions';
import { makeSelector } from '../selector';

class User extends Component {
  /*
   Trigger Facebook Login
   */
  onClickFacebook =() => {
    this.props.onFacebook();
  };

  /*
   Trigger google Login
   */
  onClickGoogle = () => {
    this.props.onGoogle();
  };

  render() {
    return (
      <Login
        faceBookSignUp={this.onClickFacebook}
        googleSignUp={this.onClickGoogle}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFacebook: () => dispatch(facebookSignIn()),
    onGoogle: () => dispatch(googleSignIn()),
  };
}

function mapStateToProps(state) {
  return makeSelector(state);
}

User.propTypes = {
  onFacebook: PropTypes.func.isRequired,
  onGoogle: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
