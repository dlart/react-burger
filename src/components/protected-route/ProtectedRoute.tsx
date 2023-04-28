import React, {FC} from 'react'
import { Navigate, } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute: FC<{children: any}> = ({ children }) => {
  // @ts-ignore
  const { isLoggedIn } = useSelector((state) => state.user);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
