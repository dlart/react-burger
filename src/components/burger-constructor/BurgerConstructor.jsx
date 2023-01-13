import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, ConstructorElement, CurrencyIcon, DragIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropTypes from '../../utils/ingredientPropTypes';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/OrderDetails';

function BurgerConstructor({ingredients}) {
    const [open, setOpen] = useState(false);

    const calcTotal = (ingredients) => ingredients
        .map((ingredient) => ingredient.price)
        .reduce(
            (previous, current) => previous + current,
            0,
        );

    const total = useMemo(
        () => calcTotal(ingredients),
        [ingredients],
    );

    const firstIngredient = ingredients[0];
    const lastIngredient = ingredients[ingredients.length + 1];

    const modal = <OrderDetails
        id={123456}
        onClose={() => setOpen(false)}
    />;

    return (
        <>
            <section className={`${styles.burgerConstructor} mt-25 p-4`}>
                {firstIngredient &&
                    <ConstructorElement
                        extraClass="ml-6"
                        isLocked={true}
                        price={firstIngredient.price}
                        text={firstIngredient.name}
                        thumbnail={firstIngredient.image}
                        type="top"
                    />
                }
                <ul className="mt-4">
                    {ingredients.map((
                        {
                            image,
                            name,
                            price,
                        },
                        index,
                    ) => {
                        return (
                            <li key={index}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    key={index}
                                    isLocked={false}
                                    text={name}
                                    price={price}
                                    thumbnail={image}
                                />
                            </li>
                        );
                    })}
                </ul>
                {lastIngredient &&
                    <ConstructorElement
                        extraClass="ml-6"
                        isLocked={true}
                        price={lastIngredient.price}
                        text={lastIngredient.name}
                        thumbnail={lastIngredient.image}
                        type="bottom"
                    />
                }
                <section className={`${styles.total} mt-10`}>
                <span className={`${styles.totalAmount} text text_type_main-large`}>
                    {total}
                    <CurrencyIcon type="primary" />
                </span>
                    <Button
                        extraClass="ml-10"
                        htmlType="button"
                        onClick={() => setOpen(true)}
                        size="large"
                        type="primary"
                    >
                        Оформить заказ
                    </Button>
                </section>
            </section>
            {open && modal}
        </>
    );
}

BurgerConstructor.propTypes = {ingredients: PropTypes.arrayOf(ingredientPropTypes)};

export default BurgerConstructor;
