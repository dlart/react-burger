import React from 'react';
import styles from './not-found-page.module.css';

export default function NotFoundPage() {
  return (
    <main className={`${styles.main} pl-10 pr-10 pt-10`}>
      <p className="text text_type_digits-large">404</p>
      <p className="text text_type_main-medium">Страница не найдена</p>
    </main>
  );
}
