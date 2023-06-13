import React, {FC} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import Modal from '../../components/modal/Modal';
import OrderDetails from '../../components/order-details/OrderDetails';
import {closeModal as closeOrderModal} from '../../services/reducers/order';
import styles from './burger-constructor-page.module.css';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';

const BurgerConstructorPage: FC = () => {
  const dispatch = useAppDispatch();

  const {
    request: ingredientsRequest,
    requestFailed: ingredientsRequestFailed,
    requestSuccess: ingredientsRequestSuccess,
  } = useAppSelector(state => state.ingredients);

  const {
    number: orderNumber,
    modalOpen: orderModalOpen,
  } = useAppSelector(
    state => state.order
  );

  return (
    <>
      {
        ingredientsRequest
        && !ingredientsRequestFailed
        && !ingredientsRequestSuccess
        && (
          <h1>Загрузка ингредиентов...</h1>
        )
      }
      {
        !ingredientsRequest
        && ingredientsRequestFailed
        && !ingredientsRequestSuccess
        && (
          <h1>Что-то пошло не так...</h1>
        )
      }
      {
        !ingredientsRequest
        && !ingredientsRequestFailed
        && ingredientsRequestSuccess
        && (
          <main className={`${styles.main} pl-10 pr-10`}>
            <DndProvider backend={HTML5Backend}>
              <section>
                <BurgerIngredients />
              </section>
              <section>
                <BurgerConstructor />
              </section>
            </DndProvider>
          </main>
        )
      }
      {
        orderModalOpen && null !== orderNumber && (
          <Modal title={''} onClose={() => dispatch(closeOrderModal())}>
            <OrderDetails id={orderNumber} />
          </Modal>
        )
      }
    </>
  );
}

export default BurgerConstructorPage;
