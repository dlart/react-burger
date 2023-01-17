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
        <header className={`${styles.header} p-4`}>
            <nav>
                <ul>
                    <li className={`${styles.active} p-5`}>
                        <a href="#">
                            <BurgerIcon type="primary" />
                            <span className="ml-2 text text_type_main-default">
                                Конструктор
                            </span>
                        </a>
                    </li>
                    <li className="ml-2 p-5">
                        <a href="#">
                            <ListIcon type="secondary" />
                            <span className="ml-2 text text_type_main-default">
                                Лента заказов
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
            <a
                className={styles.logo}
                href="#"
            >
                <Logo />
            </a>
            <nav className={styles.menu}>
                <ul>
                    <li className="p-5">
                        <a href="#">
                            <ProfileIcon type="secondary" />
                            <span className="ml-2 text text_type_main-default">
                                Личный кабинет
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
