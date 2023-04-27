import React, {FC} from 'react'
import { Navigate, } from 'react-router-dom'
import { useSelector } from 'react-redux'

// @ts-ignore
export const ProtectedRoute: FC = ({ children }) => {
  // @ts-ignore
  const { isLoggedIn } = useSelector((state) => state.user);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
