import React, {useEffect, useState} from 'react';
import styles from './burger-constructor.module.css';
import data from '../../utils/data';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
    const [products, setProducts] = useState([]);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        setProducts(data);

        let sum = 0;

        for (const product of data) {
            sum += product.price;
        }

        setSum(sum);
    }, []);

    return (
        <section className={[styles.burgerConstructor, 'mt-25 p-4'].join(' ')}>
            <ul>
                {products.map((product, index) => {
                    let type = undefined;

                    if (0 === index) {
                        type = 'top';
                    }

                    if (products.length - 1 === index) {
                        type = 'bottom';
                    }

                    return (
                        <li>
                            {type === undefined &&
                                <DragIcon type="primary" />
                            }
                            <ConstructorElement
                                extraClass={type !== undefined ? 'ml-6' : null}
                                key={index}
                                type={type}
                                isLocked={true}
                                text={product.name}
                                price={product.price}
                                thumbnail={product.image}
                            />
                        </li>
                    );
                })}
            </ul>
            <div className={[styles.total, 'mt-10'].join(' ')}>
                <span className={[styles.amount, 'mr-2'].join(' ')}>{sum}</span>
                <CurrencyIcon type="primary" />
                <Button extraClass="ml-5" htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;
