import React, { useState } from 'react'
import styles from './reset-password-page.module.css'
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import api from '../../services/api'
import { Link } from 'react-router-dom'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.passwordReset({
      password,
      token,
    });
  }

  return (
    <main className={`${styles.main} pl-10 pr-10 pt-10`}>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className="text text_type_main-medium pt-2">
          Восстановление пароля
        </div>
        <PasswordInput
          onChange={(event) => setPassword(event.target.value)}
          name={'password'}
          placeholder="Введите новый пароль"
          icon="HideIcon"
          value={password}
        />
        <Input
          onChange={(event) => setToken(event.target.value)}
          name={'token'}
          placeholder="Введите код из письма"
          value={token}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
        <p className="text text_type_main-small">
          <span>Вспомнили пароль?</span>
          &nbsp;
          <Link
            className={styles.link}
            to="/login"
          >
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
}
