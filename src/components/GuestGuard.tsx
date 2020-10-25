import React, { useContext, FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext'

const GuestGuard:FunctionComponent = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Redirect to="/admin/profile" />;
  }

  return (
    <>
      {children}
    </>
  );
};
export default GuestGuard;
