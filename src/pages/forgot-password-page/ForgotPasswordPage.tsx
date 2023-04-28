import React, {useState, FC, SyntheticEvent} from 'react'
import styles from './forgot-password-page.module.css'
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom'

const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await api.passwordResetRequest(email);
    navigate('/reset-password');
  }

  return (
    <main className={`${styles.main} pl-10 pr-10 pt-10`}>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className="text text_type_main-medium pt-2">
          Восстановление пароля
        </div>
        <EmailInput
          name={'email'}
          placeholder="Укажите e-mail"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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

export default ForgotPasswordPage;
