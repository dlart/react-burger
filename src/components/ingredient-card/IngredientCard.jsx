import React from 'react';
import ingredientPropTypes from '../../utils/ingredientPropTypes';
import styles from './ingredient-card.module.css';
import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientCard({ingredient, onClick}) {
    return (
        <li
            className={styles.ingredient}
            onClick={onClick}
        >
            <Counter count={1} />
            <img
                alt={ingredient.name}
                className="ml-4 mr-4"
                src={ingredient.image}
            />
            <div className={`${styles.price} mt-1`}>
                <span className="text text_type_digits-default">
                    {ingredient.price}
                </span>
                <CurrencyIcon type="primary"/>
            </div>
            <div className={`${styles.name} mt-1 text text_type_main-default`}>
                {ingredient.name}
            </div>
        </li>
    );
}

IngredientCard.propTypes = {ingredient: ingredientPropTypes.isRequired}
