import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link, NavLink } from 'react-router-dom'

export default function AppHeader() {
  return (
    <header className={`${styles.header} p-4`}>
      <nav>
        <ul>
          <li className={`${styles.menuItem} p-5 text text_type_main-default`}>
            <NavLink
              to="/"
              className={(({isActive}) => isActive ? styles.active : null)}
            >
              <ProfileIcon type="secondary" />
              <span className="ml-2 text text_type_main-default">
                Конструктор
              </span>
            </NavLink>
          </li>
          <li className={`${styles.menuItem} p-5 text text_type_main-default`}>
            <NavLink
              to="/order-feed"
              className={(({isActive}) => isActive ? styles.active : null)}
            >
              <ProfileIcon type="secondary" />
              <span className="ml-2 text text_type_main-default">
                Лента заказов
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div
        className={styles.logo}
      >
          <Logo />
      </div>
      <nav className={styles.menu}>
        <ul>
          <li className={`${styles.menuItem} p-5 text text_type_main-default`}>
            <NavLink
              to="/profile"
              className={(({isActive}) => isActive ? styles.active : null)}
            >
              <ProfileIcon type="secondary" />
              <span className="ml-2 text text_type_main-default">
                Личный кабинет
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
