import React, {FC} from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import {Route, Routes, useLocation} from 'react-router-dom';
import RoutingModal from '../routing-modal/RoutingModal';
import BurgerConstructorPage from '../../pages/burger-constructor-page/BurgerConstructorPage';
import LoginPage from '../../pages/login-page/LoginPage';
import RegisterPage from '../../pages/register-page/RegisterPage';
import ForgotPasswordPage from '../../pages/forgot-password-page/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/reset-password-page/ResetPasswordPage';
import ProfilePage from '../../pages/profile-page/ProfilePage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import OrderFeedPage from '../../pages/order-feed-page/OrderFeedPage';
import {ProtectedRoute} from '../protected-route/ProtectedRoute';
import {OnlyUnAuthRoute} from '../only-un-auth-route/OnlyUnAuthRoute';
import {getIngredients} from '../../services/actions/ingredients';
import IngredientPage from '../../pages/ingredient-page/IngredientPage';
import {getUser} from '../../services/actions/user';
import {ROUTE} from '../../constants';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {RootState} from '../../services/store';
import PageFeedDetail from '../../pages/page-feed-detail/PageFeedDetail';

const App: FC = () => {
    const dispatch = useAppDispatch();

    const {items} = useAppSelector((state: RootState) => state.ingredients);

    React.useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUser());
    }, [dispatch]);

    const location = useLocation();

    const background = location.state?.background;

    return (
        <div className={styles.page}>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path={ROUTE.INDEX} element={<BurgerConstructorPage/>}/>
                <Route path={ROUTE.LOGIN} element={(
                    <OnlyUnAuthRoute>
                        <LoginPage/>
                    </OnlyUnAuthRoute>
                )}/>
                <Route path={ROUTE.REGISTER} element={(
                    <OnlyUnAuthRoute>
                        <RegisterPage/>
                    </OnlyUnAuthRoute>
                )}/>
                <Route path={ROUTE.FORGOT_PASSWORD} element={(
                    <OnlyUnAuthRoute>
                        <ForgotPasswordPage/>
                    </OnlyUnAuthRoute>
                )}/>
                <Route path={ROUTE.RESET_PASSWORD} element={(
                    <OnlyUnAuthRoute>
                        <ResetPasswordPage/>
                    </OnlyUnAuthRoute>
                )}/>
                <Route
                    path={ROUTE.PROFILE}
                    element={(
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    )}
                >
                    <Route
                        element={<ProfilePage/>}
                        path={ROUTE.USER_ORDERS}
                    />
                    <Route
                        element={<PageFeedDetail/>}
                        path={ROUTE.USER_ORDER_DETAIL}
                    />
                </Route>
                <Route
                    element={items.length && <IngredientPage/>}
                    path={ROUTE.INGREDIENT}
                />
                <Route
                    element={(
                        <ProtectedRoute>
                            <OrderFeedPage/>
                        </ProtectedRoute>
                    )}
                    path={ROUTE.ORDER_FEED}
                />
                <Route
                    element={<NotFoundPage/>}
                    path="*"
                />
            </Routes>
            <RoutingModal/>
        </div>
    );
}

export default App;
