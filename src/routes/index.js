import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from '../component/user/Login';
import SignUp from '../component/user/SignUp';
import Dashboard from '../component/dashboard';
import App from '../App';

const Routes = () => (
    <BrowserRouter>
        <div>
            <Route path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
        </div>
    </BrowserRouter>
);

export default Routes;