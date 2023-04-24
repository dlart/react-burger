import React from 'react'
import { Navigate, } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const OnlyUnAuthRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
