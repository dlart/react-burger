import React, {useEffect, useMemo} from 'react';
import styles from './order.module.css';
import OrderIngredientIcon from '../order-ingredient-icon/OrderIngredientIcon';
import Price from '../current-price/Price';
import {useLocation} from 'react-router-dom';
import {FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {IIngredient} from '../../types/IIngredient';
import {getOrderDetails} from '../../services/actions/orderDetail';
import {ROUTE} from '../../constants';

const Order = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const {order} = useAppSelector(state => state.orderDetail);

  const {items} = useAppSelector(state => state.ingredients);

  const number = location
    .pathname
    .split(`${ROUTE.ORDER_FEED}/`)[1];

  useEffect(() => {
    dispatch(getOrderDetails(number))
  }, [dispatch, number]);

  const currentOrderInfo = order?.orders[0];

  const ingredientsCounts: {[key: string]: number} = {};

  currentOrderInfo?.ingredients.forEach((x: string) => {
    ingredientsCounts[x] = (ingredientsCounts[x] || 0) + 1;
  });

  const ingredientData = useMemo(() => {
    return Object
      .keys(ingredientsCounts)
      .map((ingredientId) => (
        items.find((el) => el._id === ingredientId)
      ));
  }, [
    ingredientsCounts,
    items,
  ]);

  const productsPrice: number[] = [];

  for (let key in ingredientsCounts) {
    const ingredient = items.find((el: IIngredient): boolean => el._id === key);

    if (ingredient) {
      productsPrice.push(ingredient.price * ingredientsCounts[key]);
    }
  }

  const orderSum: number = useMemo(() => {
    return productsPrice.reduce((accumulator: number, currentValue: number) => {
      return accumulator + (currentValue || 0);
    }, 0);
  }, [productsPrice]);

  return (
    <div className={styles.body}>
      <div className={styles.number}>
        <p className="text text_type_digits-default">
          # {number}
        </p>
      </div>
      <div className={styles.name}>
        <h1 className="text text_type_main-medium">
          {currentOrderInfo?.name}
        </h1>
        <div className={styles.status}>
        {'done' === currentOrderInfo?.status ? (
          <p className={`text text_type_main-default ${styles.statusDone}`}>
            Выполнен
          </p>
        ) : 'pending' === currentOrderInfo?.status ? (
          <p className={`text text_type_main-default ${styles.statusPending}`}>Ожидается</p>
        ) : (
          <p className={`text text_type_main-default ${styles.statusNew}`}>
            Создан
          </p>
        )}
      </div>
    </div>
    <div className={styles.block}>
      <p className={'text text_type_main-medium mb-6'}>
        Состав:
      </p>
      <div className={styles.blockInner}>
        {ingredientData.map((ingredient, index: number) => (
          <div key={index} className={styles.blockInnerItem}>
            <OrderIngredientIcon ingredient={ingredient?._id}/>
            <div className={styles.ingredient_name}>
              <p className="text text_type_main-default">
                {ingredient?.name}
              </p>
            </div>
            <div className={styles.counter}>
              <div className={styles.count}>
                <p className="text text_type_digits-default">
                  {ingredientsCounts[ingredient?._id ?? '']}
                </p>
              </div>
              <div className={styles.separator}>
                <p className="text text_type_digits-default">
                  x
                </p>
              </div>
              <Price sum={ingredient?.price} size={'default'}/>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className={styles.footer}>
      <div className={styles.date}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(currentOrderInfo?.createdAt ?? '')} />
        </p>
      </div>
      <div className={styles.sum}>
        <Price sum={orderSum} size={'default'}/>
      </div>
    </div>
  </div>
);
};

export default Order;
