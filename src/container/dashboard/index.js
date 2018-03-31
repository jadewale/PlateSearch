import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import DynamicImport from '../../services/DynamicImport';
import AuthService from '../../services/AuthService';
import { makeSelector } from './selector';

export const Dashboard = (props) => (
  <DynamicImport load={() => import('./scenes/')}>
    {
      (Component) => Component === null ? <p>Loading</p> : <Component {...props} />
    }
  </DynamicImport>
);

class SecretRoute extends React.Component {
  render() {
    const { component: Component, user: { userProfile: { email } } } = this.props;

    return (
      <Route
        {...this.props}
        render={(props) => (
          AuthService.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to="/login" />
        )}
      />
    );
  }
}

function mapStateToProps(state) {
  return makeSelector(state);
}

SecretRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default withRouter(connect(mapStateToProps, null)(SecretRoute));
