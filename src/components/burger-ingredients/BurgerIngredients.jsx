import React, {useState, useEffect} from 'react';
import {CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import data from '../../utils/data';

function BurgerIngredients() {
    const [current, setCurrent] = useState('bun');
    const [products, setProducts] = useState([]);

    const updateFilter = (value) => {
        setCurrent(value);
        setProducts(data.filter((product) => {
            return product.type === current;
        }));
    };

    useEffect(() => {
        updateFilter(current);
    }, [current]);

    return (
        <>
            <h2 className={[styles.title, 'pt-10'].join(' ')}>Соберите бургер</h2>
            <nav className={[styles.tabs, 'pt-5'].join(' ')}>
                <Tab value="bun" active={current === 'bun'} onClick={updateFilter}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={updateFilter}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={updateFilter}>
                    Начинки
                </Tab>
            </nav>
            <section className={[styles.products, 'mb-10 mt-5'].join(' ')}>
                <section className={[styles.category].join(' ')}>
                    <h3 className={styles.title}>Булки</h3>
                    <ul className="pl-4 pr-4 pt-6">
                        {products.map(({image, name, price}, index) => {
                            return (
                                <li key={index} className="mb-10">
                                    <Counter count={1} size="default" extraClass="m-1" />
                                    <img className="" src={image}  alt={name}/>
                                    <span className={[styles.price, 'pt-1'].join(' ')}>
                                        <span className={styles.amount}>
                                            {price}
                                        </span>
                                        <span className={styles.currency}>
                                            <CurrencyIcon type="primary" />
                                        </span>
                                    </span>
                                    <h4 className={[styles.name, 'pt-1'].join(' ')}>{name}</h4>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </section>
        </>
    );
}

export default BurgerIngredients;
