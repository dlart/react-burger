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
                        <button className={`${styles.menuItem} text text_type_main-default`} type="button">
                            <BurgerIcon type="primary" />
                            <span className="ml-2 text text_type_main-default">
                                Конструктор
                            </span>
                        </button>
                    </li>
                    <li className="ml-2 p-5">
                        <button className={`${styles.menuItem} text text_type_main-default`} type="button">
                            <ListIcon type="secondary" />
                            <span className="ml-2 text text_type_main-default">
                                Лента заказов
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>
            <button
                className={styles.logo}
                type="button"
            >
                <Logo />
            </button>
            <nav className={styles.menu}>
                <ul>
                    <li className="p-5">
                        <button className={`${styles.menuItem} text text_type_main-default`} type="button">
                            <ProfileIcon type="secondary" />
                            <span className="ml-2 text text_type_main-default">
                                Личный кабинет
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
