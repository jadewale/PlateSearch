import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../container/user/';
import SignUp from '../container/admin/';
import SecretRoute, { Dashboard } from '../container/dashboard/';
import App from '../container/App';

const Routes = () => (
  <Switch>
    <div>
      <Route path="/" component={App} />
      <Redirect from="/" to="login" />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <SecretRoute path="/dashboard" component={Dashboard} />
    </div>
  </Switch>
);

export default Routes;
