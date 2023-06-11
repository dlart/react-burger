import React, {FC, SyntheticEvent, useState} from 'react'
import {Button, EmailInput, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import {Link, useNavigate} from 'react-router-dom'
import {loginUser} from '../../services/actions/user';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';

const LoginPage: FC = () => {
  const {
    isLoggedIn,
    loginRequestFailed,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser({
      email,
      password,
    }));

    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
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
        {
          loginRequestFailed
          && (
            <p className={styles.error}>Ошибка авторизации</p>
          )
        }
        <EmailInput
          onChange={(event) => setEmail(event.target.value)}
          name={'email'}
          value={email}
        />
        <PasswordInput
          onChange={(event) => setPassword(event.target.value)}
          name={'password'}
          icon="HideIcon"
          value={password}
        />
        <Button
          htmlType="submit"
          size="medium"
          type="primary"
        >
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

export default LoginPage;
