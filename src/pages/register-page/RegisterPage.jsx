import React, { useState } from 'react'
import styles from './register-page.module.css'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../services/actions/user';

export default function RegisterPage() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  if (isLoggedIn) {
    navigate('/', {replace: true});
    
    return null;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(register(
      email,
      password,
      name,
    ))

    navigate('/');
  }

  return (
    <main className={`${styles.main} pl-10 pr-10 pt-10`}>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className="text text_type_main-medium pt-2">
          Регистрация
        </div>
        <Input
          onChange={(event) => setName(event.target.value)}
          name={'name'}
          placeholder="Имя"
          value={name}
        />
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
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-small">
          <span>Уже зарегистрированы?</span>
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
