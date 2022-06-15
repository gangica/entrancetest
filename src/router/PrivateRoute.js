import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getLocalAccessToken } from '../services/localStorage';

const PrivateRoute = ({
  redirect = "/login"
}) => {
  const localToken = getLocalAccessToken();

  if (!localToken) {
    return <Navigate to={redirect} replace />
  }

  return <Outlet />;
}

export default PrivateRoute;
