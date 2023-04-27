import React, {SyntheticEvent, FC} from 'react';
import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_TYPE_BUN } from '../../constants';
import styles from './ingredient-card.module.css';
import burgerConstructorSlice from '../../services/reducers/burgerConstructor';
import ingredientsSlice from '../../services/reducers/ingredients';
import { Link, useLocation } from 'react-router-dom'
import {IIngredient} from "../../types";

interface IngredientCardProps {
  ingredient: IIngredient;
  onClick?: (e: SyntheticEvent) => void;
}

const IngredientCard: FC<IngredientCardProps> = ({
  ingredient,
  onClick,
}) => {
  const location = useLocation();
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
        /** @ts-ignore */
        dispatch(addIngredient(ingredient));
        /** @ts-ignore */
        dispatch(increaseCount(ingredient._id));
      }
    },
    item: ingredient,
    type: ingredient.type,
  });

  return (
    <>
      {ingredient && (
        <li
          className={styles.ingredient}
          onClick={onClick}
          ref={ref}
          style={{opacity}}
        >
          <Link
            className={styles.link}
            to={{
              pathname: `/ingredients/${ingredient._id}`,
            }}
            state={{ background: location }}
          >
            <Counter count={Number(ingredient.count)} />
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
          </Link>
        </li>
      )}
    </>
  );
}

export default IngredientCard;
