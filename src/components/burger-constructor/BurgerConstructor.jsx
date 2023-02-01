import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import _ from 'underscore';
import { useDrop } from 'react-dnd';
import {
  INGREDIENT_TYPE_BUN,
  INGREDIENT_TYPE_MAIN,
  INGREDIENT_TYPE_SAUCE,
} from '../../constants';
import styles from './burger-constructor.module.css'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorIngredient from '../burger-constructor-ingredient/BurgerConstructorIngredient'
import burgerConstructorSlice from '../../services/reducers/burgerConstructor';
import ingredientsSlice from '../../services/reducers/ingredients';
import { createOrder } from '../../services/actions/order'

export default function BurgerConstructor() {
  const dispatch = useDispatch();

    const {
        decreaseCount,
        increaseCount,
    } = ingredientsSlice.actions;

    const {
        calcTotalPrice,
        setBun,
    } = burgerConstructorSlice.actions

    const {
        bun,
        ingredients,
        totalPrice,
    } = useSelector(state => state.burgerConstructor);

    useEffect(
      () => {
          dispatch(calcTotalPrice());
      },
      [
          bun,
          calcTotalPrice,
          dispatch,
          ingredients,
        ],
      );

    const handleBunItemDrop = (newBun) => {
      dispatch(decreaseCount(bun._id));
      dispatch(decreaseCount(bun._id));
      dispatch(increaseCount(newBun._id));
      dispatch(increaseCount(newBun._id));
      dispatch(setBun(newBun));
    };

    const [
      topBunStyle,
      dropTopBunTarget,
    ] = useDrop({
      accept: INGREDIENT_TYPE_BUN,
      collect: monitor => ({ background: monitor.isOver() ? '#624172' : '#2f2f37' }),
      drop(newBunItem) {
        handleBunItemDrop(newBunItem);
      }
    });

    const [
      bottomBunStyle,
      dropBottomBunTarget,
    ] = useDrop({
      accept: INGREDIENT_TYPE_BUN,
      collect: monitor => ({ background: monitor.isOver() ? '#624172' : '#2f2f37' }),
      drop(newBun) {
        dispatch(decreaseCount(bun._id));
        dispatch(decreaseCount(bun._id));
        dispatch(increaseCount(newBun._id));
        dispatch(increaseCount(newBun._id));
        dispatch(setBun(newBun));
      },
      type: 'ingredient',
    });

    const [
      ingredientsStyle,
      dropIngredientTarget,
    ] = useDrop({
      accept: [
        INGREDIENT_TYPE_MAIN,
        INGREDIENT_TYPE_SAUCE,
      ],
      collect: monitor => ({ background: monitor.isOver() ? '#624172' : '#2f2f37' }),
    });

    const handlerCreateOrder = () => {
      const ids = [
        bun._id,
        ...ingredients.map(ingredient => ingredient._id),
      ];
      dispatch(createOrder(ids));
    };

    const generateItemHash = () => Math.floor(Math.random() * 10000);

    return (
      <>
        <section className={`${styles.burgerConstructor} mt-25 p-4`}>
          <div
            className={`${styles.bunPlaceholder} ${!_.isEmpty(bun) ? styles.bunPlaceholderFilled : null} constructor-element constructor-element_pos_top ml-6`}
            ref={dropTopBunTarget}
            style={topBunStyle}
          >
            {!_.isEmpty(bun)
              ? (
                <ConstructorElement
                  isLocked={true}
                  price={bun.price}
                  text={`${bun.name} (верх)`}
                  thumbnail={bun.image}
                  type="top"
                />
              )
              : (
                <span>
                  Выберите булку
                </span>
              )
            }
            </div>
            <div ref={dropIngredientTarget}>
              {0 < ingredients.length
                ? (
                  <ul className="mt-4">
                    {ingredients
                      .map((
                        ingredient,
                        index,
                      ) => {
                        return (
                          <BurgerConstructorIngredient
                            key={ingredient._id + generateItemHash()}
                            index={index}
                            ingredient={ingredient}
                          />
                        );
                      })}
                    </ul>
                  )
                  : (
                    <div
                      className={`${styles.ingredientsPlaceholder} constructor-element mb-4 ml-6 mt-4`}
                      style={ingredientsStyle}
                    >
                      <span>Выберите ингридиенты</span>
                    </div>
                  )
                }
              </div>
              <div
                className={`${styles.bunPlaceholder} ${!_.isEmpty(bun) ? styles.bunPlaceholderFilled : null} constructor-element constructor-element_pos_bottom ml-6`}
                ref={dropBottomBunTarget}
                style={bottomBunStyle}
              >
              {!_.isEmpty(bun)
                ? (
                <ConstructorElement
                  extraClass="ml-6"
                  isLocked={true}
                  price={bun.price}
                  text={`${bun.name} (низ)`}
                  thumbnail={bun.image}
                  type="bottom"
                />
              )
              : (
                <span>
                  Выберите булку
                </span>
              )
            }
          </div>
          <section className={`${styles.total} mt-10`}>
            <span className={`${styles.totalAmount} text text_type_main-large`}>
              {totalPrice}
              <CurrencyIcon type="primary" />
            </span>
            <Button
              extraClass="ml-10"
              htmlType="button"
              onClick={handlerCreateOrder}
              size="large"
              type="primary"
            >
              Оформить заказ
            </Button>
          </section>
        </section>
      </>
    );
};
