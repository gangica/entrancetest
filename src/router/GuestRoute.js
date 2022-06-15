import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getLocalAccessToken } from '../services/localStorage';

const GuestRoute = ({
  redirect = "/"
}) => {
  const localToken = getLocalAccessToken();

  if (localToken) {
    return <Navigate to={redirect} replace />
  }

  return <Outlet />;
}

export default GuestRoute;
