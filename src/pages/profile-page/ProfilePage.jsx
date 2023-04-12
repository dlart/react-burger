import React, { useEffect, useState } from 'react'
import styles from './profile-page.module.css'
import {
  NavLink,
  useNavigate,
} from 'react-router-dom'
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { logout } from '../../services/actions/logout'
import { getUser, updateUser } from '../../services/actions/user'

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(getUser(localStorage.getItem('token')));
    setEmail(user.email);
    setName(user.name);
  }, []);

  const handleLogout = () => {
    dispatch(logout(localStorage.getItem('refreshToken')));
    navigate("/login");
  };

  const handleSubmit = () => {
    dispatch(updateUser(
      localStorage.getItem('refreshToken'),
      {
        nmae: name,
        email: email,
        password: password
      }
    ));
  };

  return (
    <main className={`${styles.main} pl-20 pr-20 pt-20`}>
      <section className="text text_type_main-default">
        <ul className={`${styles.menu} text text_type_main-medium`}>
          <li>
            <NavLink
              className={(({isActive}) => isActive ? styles.active : null)}
              to="/profile"
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              История заказов
            </NavLink>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              Выход
            </a>
          </li>
        </ul>
        <p className={styles.help}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>
      <section className={styles.form}>
        <form
        className={styles.form}
          onSubmit={handleSubmit}
        >
          <Input
            onChange={(event) => setName(event.target.value)}
            name={'name'}
            icon="EditIcon"
            placeholder="Имя"
            value={name}
          />
          <EmailInput
            name={'email'}
            placeholder="Логин"
            icon="EditIcon"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <PasswordInput
            onChange={(event) => setPassword(event.target.value)}
            name={'password'}
            icon="EditIcon"
            value={password}
          />
        </form>
      </section>
    </main>
  );
}
