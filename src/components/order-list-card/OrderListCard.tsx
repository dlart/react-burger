import React, {useMemo} from 'react';
import styles from './order-list-card.module.css'
import OrderIngredientIcon from '../order-ingredient-icon/OrderIngredientIcon';
import Price from '../current-price/Price';
import {Link, useLocation} from 'react-router-dom';
import {FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {IFeedsIngredient} from '../../types/IFeedsIngredient';
import {useAppSelector} from '../../hooks/useAppSelector';
import {IIngredient} from '../../types/IIngredient';

const OrderListCard = ({order}: { order: IFeedsIngredient }): JSX.Element => {
  const location = useLocation();

  const {items} = useAppSelector(state => state.ingredients);

  const price: number[] = [];

  order.ingredients.map((ingredientId) => {
    return items.filter((el) => el._id === ingredientId).map((el: IIngredient) => {
      return price.push(el.price)
    });
  });

  const orderSum = useMemo(() => {
    return price.reduce((accumulator: number, currentValue: number) => {
      return accumulator + (currentValue || 0);
    }, 0);
  }, [price]);

  return (
    <Link
      className={styles.link}
      key={order._id}
      state={{background: location}}
      to={`${location.pathname}/${order.number}`}
    >
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.head}>
            <div className={styles.order_number}>
              <p className={'text text_type_digits-default'}>#{order.number}</p>
            </div>
            <div className={styles.order_date}>
              <p className={'text text_type_main-default text_color_inactive'}>
                <FormattedDate date={new Date(order.createdAt)}/>
              </p>
            </div>
          </div>
          <div className={styles.name}>
            <p className={'text text_type_main-medium'}>
              {order.name}
            </p>
            {location.pathname !== '/feed' ? (
              <div className={styles.status}>
                {order.status === 'done' ? (
                  <p className={`text text_type_main-default ${styles.status_done}`}>Выполнен</p>
                ) : order.status === 'pending' ? (
                  <p className={`text text_type_main-default ${styles.status_pending}`}>Готовится</p>
                ) : (
                  <p className={`text text_type_main-default ${styles.status_created}`}>Создан</p>
                )}
              </div>
            ) : null}
          </div>
          <div className={styles.bottom}>
            <div className={styles.ingredientsIcons}>
              {order.ingredients.slice(0, 5).map((ingredient: string, index: number) => (
                <OrderIngredientIcon
                  ingredient={ingredient}
                  key={index}
                />
              ))}
              <span className={`${styles.ingredientsIconsCount} text text_type_digits-default`}>
                {order.ingredients.length > 5 ? `+ ${order.ingredients.length - 5}` : null}
              </span>
            </div>
            <div className={styles.total}>
              <Price
                size={'medium'}
                sum={orderSum}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderListCard;