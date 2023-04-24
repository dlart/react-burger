import React, { useEffect, useMemo, useState } from 'react'
import styles from './profile-page.module.css'
import {
  NavLink,
  useNavigate,
} from 'react-router-dom'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { logout } from '../../services/actions/user'
import { updateUser } from '../../services/actions/user'

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    email,
    name,
    password,
  } = useSelector(state => state.user.user);
  
  const [form, setForm] = useState({
    email,
    name,
    password,
  });

  useEffect(() => {
    setForm({
      name,
      email,
      password,
    });
  }, [dispatch, name, email, password]);
  
  function onFormChange(event) {
    const fieldName = event
      .target
      .name;
    const fieldValue = event
      .target
      .value;
    
    setForm({
      ...form,
      [fieldName]: fieldValue,
    });
  }
  
  const isChanged = useMemo(() => {
    return email !== form.email
      || name !== form.name
      || password !== form.password;
  }, [
    email,
    form,
    name,
    password,
  ]);
  
  function onReset(event) {
    event.preventDefault();
    
    setForm({
      email,
      name,
      password,
    });
  }

  const handleLogout = () => {
    dispatch(logout());
    
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(updateUser({
      email: form.email,
      name: form.name,
      password: form.password
    }));
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
            <button onClick={handleLogout}>
              Выход
            </button>
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
            onChange={onFormChange}
            name={'name'}
            icon="EditIcon"
            placeholder="Имя"
            value={form.name}
          />
          <EmailInput
            name={'email'}
            placeholder="Логин"
            icon="EditIcon"
            onChange={onFormChange}
            value={form.email}
          />
          <PasswordInput
            onChange={onFormChange}
            name={'password'}
            icon="EditIcon"
            value={form.password}
          />
          <Button
            htmlType="submit"
            size="medium"
            type="primary"
          >
            Сохранить
          </Button>
          {
            isChanged
            ? (
                <Button
                  htmlType={'button'}
                  onClick={onReset}
                  size="large"
                  type="secondary"
                >
                  Отмена
                </Button>
            )
            : null
          }
        </form>
      </section>
    </main>
  );
}
