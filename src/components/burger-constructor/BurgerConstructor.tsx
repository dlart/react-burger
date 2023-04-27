import React, { useMemo, FC } from 'react';
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
import { createOrder } from '../../services/actions/order';
import {IIngredient} from '../../types';

const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();

    /** @ts-ignore */
    const { isLoggedIn } = useSelector(state => state.user);

    const {
        decreaseCount,
        increaseCount,
    } = ingredientsSlice.actions;

    const { setBun } = burgerConstructorSlice.actions


    const {
        bun,
        ingredients,
    } = useSelector(state => {
        /** @ts-ignore */
        return state.burgerConstructor
    });

    const getSelectedIngredientsIds = useMemo(() => {

        if (bun._id === undefined) {
            return ingredients.map((ingredient: IIngredient) => ingredient._id);
        }

        return [
            bun._id,
            ...ingredients.map((ingredient: IIngredient) => ingredient._id),
        ]
    }, [bun, ingredients]);

    const totalPrice = useMemo(
      () => {
        return _.isEmpty(bun)
          ? (
            ingredients.length
              ? ingredients.reduce((a: number, b: IIngredient) => a + b.price, 0)
              : 0
          )
          : (
            bun.price * 2
            + ingredients.reduce(
              (a: number, b: IIngredient) => a + b.price,
              0,
            )
          )
      },
      [
        bun,
        ingredients,
      ],
    );

    const handleBunItemDrop = (newBun: IIngredient) => {
      dispatch(decreaseCount(bun._id));
      dispatch(decreaseCount(bun._id));
      /** @ts-ignore */
      dispatch(increaseCount(newBun._id));
      /** @ts-ignore */
      dispatch(increaseCount(newBun._id));
      /** @ts-ignore */
      dispatch(setBun(newBun));
    };

    const [
      topBunStyle,
      dropTopBunTarget,
    ] = useDrop({
      accept: INGREDIENT_TYPE_BUN,
      collect: monitor => ({ background: monitor.isOver() ? '#624172' : '#2f2f37' }),
      drop(newBunItem) {
        /** @ts-ignore */
        handleBunItemDrop(newBunItem);
      }
    });

    /** @ts-ignore */
    const [
      bottomBunStyle,
      dropBottomBunTarget,
    ]: {bottomBunStyle: string, dropBottomBunTarget: Element} = useDrop({
      accept: INGREDIENT_TYPE_BUN,
      collect: monitor => ({ background: monitor.isOver() ? '#624172' : '#2f2f37' }),
      /** @ts-ignore */
      drop(newBun: IIngredient) {
        dispatch(decreaseCount(bun._id));
        dispatch(decreaseCount(bun._id));
        /** @ts-ignore */
        dispatch(increaseCount(newBun._id));
        /** @ts-ignore */
        dispatch(increaseCount(newBun._id));
        /** @ts-ignore */
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
      /** @ts-ignore */
      dispatch(createOrder(getSelectedIngredientsIds));
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
                        ingredient: IIngredient,
                        index: number,
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
              disabled={!isLoggedIn || getSelectedIngredientsIds.length === 0}
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

export default BurgerConstructor;
