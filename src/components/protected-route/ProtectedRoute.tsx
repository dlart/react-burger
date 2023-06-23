import React, {FC} from 'react'
import {Navigate, useLocation,} from 'react-router-dom'
import {useAppSelector} from "../../hooks/useAppSelector";

export const ProtectedRoute: FC<{children: any}> = ({ children }) => {
  const location = useLocation();

  const { isLoggedIn } = useAppSelector((state) => state.user);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location}}/>;
  }
  
  return children;
};
