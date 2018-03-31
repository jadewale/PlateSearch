import React from 'react';
import DynamicImport from '../../services/DynamicImport';

const Login = (props) => (
  <DynamicImport load={() => import('./scenes/')}>
    {
      (Component) => Component === null ? <p>Loading</p> : <Component {...props} />
    }
  </DynamicImport>
);

export default Login;
