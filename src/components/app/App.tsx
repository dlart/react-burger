import React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import ingredientSlice from '../../services/reducers/ingredient';
import orderSlice from '../../services/reducers/order';
import styles from './App.module.css';
import AppHeader from '../../components/app-header/AppHeader';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderDetails from "../order-details/OrderDetails";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export default function App() {
  const dispatch = useDispatch();

  const {
    request: ingredientsRequest,
    requestFailed: ingredientsRequestFailed,
    requestSuccess: ingredientsRequestSuccess,
  } = useSelector(
    // @ts-ignore
    state => state.ingredients
  );

  const {
    item: ingredient,
    modalOpen: ingredientModalOpen,
  } = useSelector(
    // @ts-ignore
    state => state.ingredient
  );

  const {
    number: orderNumber,
    modalOpen: orderModalOpen,
  } = useSelector(
    // @ts-ignore
    state => state.order
  );

  React.useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  const { closeModal: closeIngredientsModal } = ingredientSlice.actions;

  const { closeModal: closeOrderModal } = orderSlice.actions;

  return (
    <div className={styles.page}>
        <AppHeader />
        <main className={`${styles.main} pl-10 pr-10`}>
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
                    <DndProvider backend={HTML5Backend}>
                        <section>
                            <BurgerIngredients />
                        </section>
                        <section>
                            <BurgerConstructor />
                        </section>
                    </DndProvider>
                )
            }
            {
                ingredientModalOpen && (
                <Modal
                    onClose={() => dispatch(closeIngredientsModal())}
                    title='Детали ингредиента'
                >
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            )}
            {
                orderModalOpen && (
                    <Modal onClose={() => dispatch(closeOrderModal())}>
                        <OrderDetails id={orderNumber} />
                    </Modal>
                )}
        </main>
    </div>
  );
}
