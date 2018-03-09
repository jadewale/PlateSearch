import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../container/user';
import SignUp from '../component/user/SignUp';
import Dashboard from '../container/dashboard';
import App from '../container/App';

const Routes = () => (
  <Switch>
    <div>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Switch>
);

export default Routes;
