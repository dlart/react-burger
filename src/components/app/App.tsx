import React, {FC} from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import {Route, Routes, useLocation} from 'react-router-dom';
import RoutingModal from '../routing-modal/RoutingModal';
import BurgerConstructorPage from "../../pages/burger-constructor-page/BurgerConstructorPage";
import LoginPage from "../../pages/login-page/LoginPage";
import RegisterPage from "../../pages/register-page/RegisterPage";
import ForgotPasswordPage from "../../pages/forgot-password-page/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/reset-password-page/ResetPasswordPage";
import ProfilePage from "../../pages/profile-page/ProfilePage";
import NotFoundPage from "../../pages/not-found-page/NotFoundPage";
import OrderFeedPage from "../../pages/order-feed-page/OrderFeedPage";
import {ProtectedRoute} from "../protected-route/ProtectedRoute";
import {OnlyUnAuthRoute} from "../only-un-auth-route/OnlyUnAuthRoute";
import { getIngredients } from "../../services/actions/ingredients";
import {useDispatch, useSelector} from "react-redux";
import IngredientPage from '../../pages/ingredient-page/IngredientPage';
import {getUser} from "../../services/actions/user";
import { ROUTES } from '../../constants';

const App: FC = () => {
  const dispatch = useDispatch();

  // @ts-ignore
  const { items } = useSelector((state) => state.ingredients);

  React.useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients());
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const location = useLocation();
  const background = location.state?.background;

  return (
    <div className={styles.page}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path={ROUTES.INDEX_ROUTE} element={<BurgerConstructorPage />} />
          <Route path={ROUTES.LOGIN_ROUTE} element={(
              /** @ts-ignore **/
              <OnlyUnAuthRoute>
                <LoginPage />
              </OnlyUnAuthRoute>
          )} />
          <Route path={ROUTES.REGISTER_ROUTE} element={(
              /** @ts-ignore **/
              <OnlyUnAuthRoute>
                  <RegisterPage />
              </OnlyUnAuthRoute>
          )} />
          <Route path={ROUTES.FORGOT_PASSWORD_ROUTE} element={(
              /** @ts-ignore **/
              <OnlyUnAuthRoute>
                <ForgotPasswordPage />
              </OnlyUnAuthRoute>
          )} />
          <Route path={ROUTES.RESET_PASSWORD_ROUTE} element={(
              /** @ts-ignore **/
              <OnlyUnAuthRoute>
                <ResetPasswordPage />
              </OnlyUnAuthRoute>
          )} />
          <Route
              element={(
                /** @ts-ignore */
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              )}
              path={ROUTES.PROFILE_ROUTE}
          />
          <Route
              element={items.length && <IngredientPage />}
              path={ROUTES.INGREDIENT_ROUTE}
          />
          <Route
            element={(
              /** @ts-ignore */
              <ProtectedRoute>
                <OrderFeedPage />
              </ProtectedRoute>
            )}
            path={ROUTES.ORDER_FEED_ROUTE}
          />
          <Route
              path="*"
              element={<NotFoundPage />}
          />
        </Routes>
        <RoutingModal />
    </div>
  );
}

export default App;
