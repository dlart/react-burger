import React from 'react';
import styles from './App.module.css';
import AppHeader from '../../components/app-header/AppHeader';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BurgerConstructorPage from "../../pages/burger-constructor-page/BurgerConstructorPage";
import LoginPage from "../../pages/login-page/LoginPage";
import RegisterPage from "../../pages/register-page/RegisterPage";
import ForgotPasswordPage from "../../pages/forgot-password-page/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/reset-password-page/ResetPasswordPage";
import ProfilePage from "../../pages/profile-page/ProfilePage";
import NotFoundPage from "../../pages/not-found-page/NotFoundPage";
import OrderFeedPage from "../../pages/order-feed-page/OrderFeedPage";
import {ProtectedRoute} from "../protected-route/ProtectedRoute";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { getIngredients } from "../../services/actions/ingredients";
import {useDispatch} from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<BurgerConstructorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={(
              <ProtectedRoute>
                  <ResetPasswordPage />
              </ProtectedRoute>
          )} />
          <Route
              element={(
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              )}
              path="/profile"
          />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route
            element={(
              <ProtectedRoute>
                <OrderFeedPage />
              </ProtectedRoute>
            )}
            path="/order-feed"
          />
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </Router>
    </div>
  );
}
