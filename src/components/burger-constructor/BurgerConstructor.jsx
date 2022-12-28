import React, {useEffect, useState} from 'react';
import styles from './burger-constructor.module.css';
import data from '../../utils/data';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(data);
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
        </section>
    );
}

export default BurgerConstructor;
