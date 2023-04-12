import React, { useState } from 'react'
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux'
import styles from './login-page.module.css'
import { Link } from 'react-router-dom'
import { login } from '../../services/actions/login'
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(
      email,
      password,
    ));

    navigate('/');
  }

  return (
    <main className={`${styles.main} pl-10 pr-10 pt-10`}>
      <form
        className={`${styles.form}`}
        onSubmit={handleSubmit}
      >
        <div className="text text_type_main-medium pt-2">
          Вход
        </div>
        <EmailInput
          onChange={(event) => setEmail(event.target.value)}
          name={'email'}
          isIcon={false}
          value={email}
        />
        <PasswordInput
          onChange={(event) => setPassword(event.target.value)}
          name={'password'}
          icon="HideIcon"
          value={password}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
        <p className="text text_type_main-small">
          <span>Вы новый пользователь?</span>
          &nbsp;
          <Link
            className={styles.link}
            to="/register"
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-small">
          <span>Забыли пароль?</span>
          &nbsp;
          <Link
            className={styles.link}
            to="/forgot-password"
          >
            Восстановить пароль
          </Link>
        </p>
      </form>
    </main>
  );
}
