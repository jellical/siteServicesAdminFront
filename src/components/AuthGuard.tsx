import React, { useContext, FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext'


const AuthGuard:FunctionComponent = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Redirect to="/signin" />;
  }

  return (
    <>
      {children}
    </>
  );
};


export default AuthGuard;
