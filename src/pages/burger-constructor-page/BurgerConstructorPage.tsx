import React, {FC} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import Modal from '../../components/modal/Modal';
import OrderDetails from '../../components/order-details/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import orderSlice from '../../services/reducers/order';
import styles from './burger-constructor-page.module.css';

// @ts-ignore
function ingredientsSelector(state) {
  return state.ingredients;
}

const BurgerConstructorPage: FC = () => {
  const dispatch = useDispatch();

  const {
    request: ingredientsRequest,
    requestFailed: ingredientsRequestFailed,
    requestSuccess: ingredientsRequestSuccess,
  } = useSelector(ingredientsSelector);

  const {
    number: orderNumber,
    modalOpen: orderModalOpen,
  } = useSelector(
    // @ts-ignore
    state => state.order
  );

  const { closeModal: closeOrderModal } = orderSlice.actions;

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
        orderModalOpen && (
          /** @ts-ignore */
          <Modal title={''} onClose={() => dispatch(closeOrderModal())}>
            <OrderDetails id={orderNumber} />
          </Modal>
        )
      }
    </>
  );
}

export default BurgerConstructorPage;
