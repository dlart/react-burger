import React from 'react';
import styles from './order-ingredient-icon.module.css';
import {useAppSelector} from '../../hooks/useAppSelector';
import {IIngredient} from '../../types/IIngredient';

const OrderIngredientIcon = ({ingredient}: { ingredient: string | undefined}): JSX.Element => {
  const {items} = useAppSelector(state => state.ingredients);

  const icon: IIngredient | undefined = items.find((el) => el._id === ingredient);

  return (
    <div className={styles.body}>
      <img
          alt={icon?.name}
          className={styles.icon}
          src={icon?.image}
      />
    </div>
  );
};

export default OrderIngredientIcon;
