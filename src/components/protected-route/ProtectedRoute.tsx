import React, {FC} from 'react'
import { Navigate, } from 'react-router-dom'
import {useAppSelector} from "../../hooks/useAppSelector";

export const ProtectedRoute: FC<{children: any}> = ({ children }) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
