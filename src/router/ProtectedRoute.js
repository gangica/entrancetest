import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ 
  authenticated, 
  redirect = "/login",
  children
}) => {
  if (!authenticated) {
    return <Navigate to={redirect} replace />
  }

  return children;
}

export default ProtectedRoute;
