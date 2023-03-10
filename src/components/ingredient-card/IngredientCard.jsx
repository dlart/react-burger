import React from 'react';
import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_TYPE_BUN } from '../../constants';
import styles from './ingredient-card.module.css';
import ingredientPropTypes from '../../utils/ingredientPropTypes';
import burgerConstructorSlice from '../../services/reducers/burgerConstructor';
import ingredientsSlice from '../../services/reducers/ingredients';

export default function IngredientCard({
  ingredient,
  onClick,
}) {
  const dispatch = useDispatch();

  const { addIngredient } = burgerConstructorSlice.actions
  const { increaseCount } = ingredientsSlice.actions

  const [
    { opacity },
    ref,
  ] = useDrag({
    collect: monitor => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
    end(item, monitor) {
      if(monitor.didDrop()
        && INGREDIENT_TYPE_BUN !== item.type
      ) {
        dispatch(addIngredient(ingredient));
        dispatch(increaseCount(ingredient._id));
      }
    },
    item: ingredient,
    type: ingredient.type,
  });

  return (
    <li
      className={styles.ingredient}
      onClick={onClick}
      ref={ref}
      style={{opacity}}
    >
      <Counter count={ingredient.count} />
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

IngredientCard.propTypes = { ingredient: ingredientPropTypes.isRequired };
