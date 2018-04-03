import React from 'react';
import DynamicImport from '../../services/DynamicImport';

const SignUp = (props) => (
  <DynamicImport load={() => import('./scenes/signUp/')}>
    {
      (Component) => Component === null ? <p>Loading</p> : <Component {...props} />
    }
  </DynamicImport>
);

export default SignUp;