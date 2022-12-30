import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropTypes from '../../utils/ingredientPropTypes';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ingredients}) {
    const calcTotal = (ingredients) => {
        let total = 0;

        for (const ingredient of ingredients) {
            total += ingredient.price;
        }

        return total;
    }

    const total = useMemo(
        () => calcTotal(ingredients),
        [ingredients],
    );

    const firstIngredient = ingredients.shift();
    const lastIngredient = ingredients.pop();

    return (
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
                    size="large"
                    type="primary"
                >
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
}

BurgerConstructor.propTypes = {ingredients: PropTypes.arrayOf(ingredientPropTypes)};

export default BurgerConstructor;
