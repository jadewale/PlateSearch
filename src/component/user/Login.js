import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleSignIn, facebookSignIn } from '../../actions/userActions';
import { withRouter } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
    };
  }

    googleSign = () => {
      this.props.google();
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.user !== this.props.user) {
        this.props.history.push('/dashboard/register');
      }
    }

    facebookSign = () => {
      this.props.facebook();
    };

    render() {
      return (
        <div className="login-box">
          <div className="login-logo">
            <a href="#"><b>{this.state.admin ? 'Plate' : 'Plate'}</b>ME</a>
          </div>
          <div className="login-box-body">
            <p className="login-box-msg">Welcome to PlateMe by Oliver Cole. Please Sign in to start your session</p>


            {this.state.admin ?
              <form action="../../index2.html" method="post">
                <div className="form-group has-feedback">
                  <input type="email" className="form-control" placeholder="Email" />
                  <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                </div>
                <div className="form-group has-feedback">
                  <input type="password" className="form-control" placeholder="Password" />
                  <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <div className="checkbox icheck">
                      <label>
                        <input type="checkbox" /> Remember Me
                      </label>
                    </div>
                  </div>
                  <div className="col-xs-4">
                    <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                  </div>
                </div>
              </form>
              : null
            }


            <div className="social-auth-links text-center">
              <button onClick={this.facebookSign} className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook"></i> Sign in using
                            Facebook
              </button>
              <p>- OR -</p>
              <button onClick={this.googleSign} className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus"></i> Sign in using
                            Google+
              </button>
            </div>
            <Link to="/signup" className="text-center">Log In as Administrator</Link>
          </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    user: state.user.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    google: () => dispatch(googleSignIn()),
    facebook: () => dispatch(facebookSignIn()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
