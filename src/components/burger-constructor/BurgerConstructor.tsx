import React, {CSSProperties, FC, useMemo} from 'react';
import {useDrop} from 'react-dnd';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorIngredient from '../burger-constructor-ingredient/BurgerConstructorIngredient'
import {setBun} from '../../services/reducers/burgerConstructor';
import {decreaseCount, increaseCount} from '../../services/reducers/ingredients';
import {createOrder} from '../../services/actions/order';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {IIngredient} from '../../types/IIngredient';
import {IConstructorIngredient} from '../../types/IConstructorIngredient';
import {INGREDIENT} from '../../constants';

const BurgerConstructor: FC = () => {
    const dispatch = useAppDispatch();

    const {isLoggedIn} = useAppSelector(state => state.user);

    const {
        bun,
        ingredients,
    } = useAppSelector(state => state.burgerConstructor);

    const getSelectedIngredientsIds = useMemo(() => {

        if (null === bun) {
            return ingredients.map((ingredient: IIngredient) => ingredient._id);
        }

        return [
            bun._id,
            ...ingredients.map((ingredient: IIngredient) => ingredient._id),
        ]
    }, [
        bun,
        ingredients,
    ]);

    const totalPrice = useMemo(
        () => {
            return null === bun
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

    const handleBunItemDrop = (newBun: IConstructorIngredient) => {
        dispatch(setBun(newBun));
        if (null !== bun) {
            dispatch(decreaseCount(bun._id));
            dispatch(decreaseCount(bun._id));
        }

        dispatch(increaseCount(newBun._id));
        dispatch(increaseCount(newBun._id));
    };

    const [
        topBunStyle,
        dropTopBunTarget,
    ] = useDrop({
        accept: INGREDIENT.BUN,
        collect: monitor => ({background: monitor.isOver() ? '#624172' : '#2f2f37'}),
        drop: (newBunItem: IConstructorIngredient) => {
            handleBunItemDrop(newBunItem);
        }
    });

    const [
        bottomBunStyle,
        dropBottomBunTarget,
    ] = useDrop({
        accept: INGREDIENT.BUN,
        collect: monitor => ({background: monitor.isOver() ? '#624172' : '#2f2f37'}),
        drop: (newBunItem: IConstructorIngredient) => {
            dispatch(setBun(newBunItem));
            if (null !== bun) {
                dispatch(decreaseCount(bun._id));
                dispatch(decreaseCount(bun._id));
            }

            dispatch(increaseCount(newBunItem._id));
            dispatch(increaseCount(newBunItem._id));
        },
    });

    const [
        ingredientsStyle,
        dropIngredientTarget,
    ] = useDrop({
        accept: [
            INGREDIENT.MAIN,
            INGREDIENT.SAUCE,
        ],
        collect: monitor => ({background: monitor.isOver() ? '#624172' : '#2f2f37'}),
    });

    const handlerCreateOrder = () => {
        dispatch(createOrder(getSelectedIngredientsIds));
    };

    const generateItemHash = () => Math.floor(Math.random() * 10000);

    return (
        <>
            <section className={`${styles.burgerConstructor} mt-25 p-4`}>
                <div
                    className={`${styles.bunPlaceholder} ${null !== bun ? styles.bunPlaceholderFilled : null} constructor-element constructor-element_pos_top ml-6`}
                    ref={dropTopBunTarget}
                    data-testid="top-bun-drop-target"
                    style={topBunStyle}
                >
                    {null !== bun
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
                <div
                    ref={dropIngredientTarget}
                    data-testid="ingredient-drop-target"
                >
                    {0 < ingredients.length
                        ? (
                            <ul className="mt-4">
                                {ingredients
                                    .map((
                                        ingredient: IConstructorIngredient,
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
                    className={`${styles.bunPlaceholder} ${null !== bun ? styles.bunPlaceholderFilled : null} constructor-element constructor-element_pos_bottom ml-6`}
                    ref={dropBottomBunTarget}
                    data-testid="bottom-bun-drop-target"
                    style={bottomBunStyle as CSSProperties}
                >
                    {null !== bun
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
                <CurrencyIcon type="primary"/>
            </span>
                    <Button
                        extraClass="ml-10"
                        disabled={!isLoggedIn || getSelectedIngredientsIds.length === 0}
                        htmlType="button"
                        onClick={handlerCreateOrder}
                        size="large"
                        type="primary"
                        data-testid="order-button"
                    >
                        Оформить заказ
                    </Button>
                </section>
            </section>
        </>
    );
};

export default BurgerConstructor;
