import React, {FC} from 'react'
import styles from './profile-page.module.css'
import {NavLink, useLocation, useNavigate,} from 'react-router-dom'
import {logoutUser} from '../../services/actions/user'
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {ROUTE} from '../../constants';
import ProfileForm from '../../components/profile-form/ProfileForm';
import ProfileOrders from '../profile-orders/ProfileOrders';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {pathname} = useLocation();

  const handleLogout = (): void => {
    dispatch(logoutUser());
    
    navigate('/login');
  };

  return (
    <main className={`${styles.main} pl-20 pr-20 pt-20`}>
      <section className="text text_type_main-default">
        <ul className={`${styles.menu} text text_type_main-medium`}>
          <li>
            <NavLink
              className={(({isActive}) => isActive ? styles.active : undefined)}
              to="/profile"
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/profile/orders'}
              className={(({isActive}) => isActive ? styles.active : undefined)}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>
              Выход
            </button>
          </li>
        </ul>
        <p className={styles.help}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>
      <section>
        {pathname.split(`${ROUTE.USER_ORDERS}/`)[1] !== undefined ? (
          <p>AboutOrder</p>
        ) : (
          <>
            <div className={styles.content}>
              {pathname === ROUTE.PROFILE ? <ProfileForm /> : <ProfileOrders/>}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default ProfilePage;
