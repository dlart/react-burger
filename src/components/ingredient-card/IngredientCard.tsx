import React, {FC, SyntheticEvent} from 'react';
import {useDrag} from 'react-dnd';
import {Counter, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import {addIngredient} from '../../services/reducers/burgerConstructor';
import {increaseCount} from '../../services/reducers/ingredients';
import {Link, useLocation} from 'react-router-dom'
import {IConstructorIngredient} from '../../types/IConstructorIngredient';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {INGREDIENT} from '../../constants';

interface IngredientCardProps {
  ingredient: IConstructorIngredient;
  onClick?: (event: SyntheticEvent) => void;
}

const IngredientCard: FC<IngredientCardProps> = ({
  ingredient,
  onClick,
}) => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const [
      {opacity},
      ref,
  ] = useDrag({
    collect: monitor => ({opacity: monitor.isDragging() ? 0.5 : 1}),
    end(item, monitor) {
      if (INGREDIENT.BUN !== item.type
        && monitor.didDrop()
      ) {
          dispatch(addIngredient(ingredient));
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
            state={{background: location}}
            to={{pathname: `/ingredients/${ingredient._id}`}}
          >
            <Counter count={Number(ingredient.count)}/>
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
