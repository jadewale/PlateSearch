import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Login = ({ faceBookSignUp, googleSignUp }) => (
  <div className="login-box">
    <div className="login-logo">
      <a href="/"><b>Plate</b>ME</a>
    </div>
    <div className="login-box-body">
      <p className="login-box-msg">Welcome to PlateMe by Oliver Cole. Please Sign in to start your session</p>
      <div className="social-auth-links text-center">
        <button onClick={faceBookSignUp} className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook"></i> Sign in using
          Facebook
        </button>
        <p>- OR -</p>
        <button onClick={googleSignUp} className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus"></i> Sign in using
          Google+
        </button>
      </div>
      <Link to="/signup" href="/signup" className="text-center">Log In as Administrator</Link>
    </div>
  </div>
);

Login.propTypes = {
  faceBookSignUp: PropTypes.func.isRequired,
  googleSignUp: PropTypes.func.isRequired,
};

export default Login;
