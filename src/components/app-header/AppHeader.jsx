import React from 'react';
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
    return (
        <header className={[styles.header, 'p-4'].join(' ')}>
            <nav className={styles.menu}>
                <ul>
                    <li className="p-5">
                        <BurgerIcon type="primary" />
                        <span className="ml-2">Конструктор</span>
                    </li>
                    <li className="ml-2 p-5">
                        <ListIcon type="primary" />
                        <span className="ml-2">Лента заказов</span>
                    </li>
                </ul>
            </nav>
            <div className={styles.logo}>
                <Logo />
            </div>
            <nav className={styles.menu}>
                <ul>
                    <li className="p-5">
                        <ProfileIcon type="primary" />
                        <span className="ml-2">Личный кабинет</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
