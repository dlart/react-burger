import React, {useContext, useMemo, useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/OrderDetails';
import {BurgerConstructorContext} from '../../services/burgerConstructorContext';
import {API_BASE_URL, INGREDIENT_TYPE_BUN} from '../../constants';
import Api from '../../utils/api';

function BurgerConstructor() {
    const ingredients = useContext(BurgerConstructorContext);
    const [orderId, setOrderId] = useState(0);
    const [open, setOpen] = useState(false);

    const getBuns = (ingredients) => ingredients
        .filter((ingredient) => INGREDIENT_TYPE_BUN === ingredient.type);

    const buns = useMemo(
        () => getBuns(ingredients),
        [ingredients],
    );

    const bun = buns.shift();

    const getFillings = (ingredients) => ingredients.filter(ingredient => INGREDIENT_TYPE_BUN !== ingredient.type);

    const fillings = useMemo(
        () => getFillings(ingredients),
        [ingredients],
    );

    const calcTotal = (bun, fillings) => {
        const bunTotal = bun ? bun.price * 2 : 0;

        const fillingsTotal = fillings
            .map((ingredient) => ingredient.price)
            .reduce(
                (previous, current) => previous + current,
                0,
            );

        return bunTotal + fillingsTotal;
    }

    const total = useMemo(
        () => calcTotal(bun, fillings),
        [bun, fillings],
    );

    const firstIngredient = bun;
    const lastIngredient = bun;

    const modal = <OrderDetails id={orderId} onClose={() => setOpen(false)} />;

    const handlerCreateOrder = () => {
        const api = new Api({baseUrl: API_BASE_URL});

        const ingredientsIds = [
            bun._id,
            ...ingredients.map(ingredient => ingredient._id),
            bun._id,
        ];

        api
            .createOrder(ingredientsIds)
            .then((data) => {
                console.log(data);
                setOrderId(data.order.number);
                setOpen(true);
            });
    }

    return (
        <>
            <section className={`${styles.burgerConstructor} mt-25 p-4`}>
                {firstIngredient &&
                    <ConstructorElement
                        extraClass="ml-6"
                        isLocked={true}
                        price={firstIngredient.price}
                        text={firstIngredient.name}
                        thumbnail={firstIngredient.image}
                        type="top"
                    />
                }
                <ul className="mt-4">
                    {fillings
                        .map((
                            {
                                image,
                                name,
                                price,
                            },
                            index,
                    ) => {
                        return (
                            <li key={index}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    key={index}
                                    isLocked={false}
                                    text={name}
                                    price={price}
                                    thumbnail={image}
                                />
                            </li>
                        );
                    })}
                </ul>
                {lastIngredient &&
                    <ConstructorElement
                        extraClass="ml-6"
                        isLocked={true}
                        price={lastIngredient.price}
                        text={lastIngredient.name}
                        thumbnail={lastIngredient.image}
                        type="bottom"
                    />
                }
                <section className={`${styles.total} mt-10`}>
                <span className={`${styles.totalAmount} text text_type_main-large`}>
                    {total}
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
            {open && modal}
        </>
    );
}

export default BurgerConstructor;
