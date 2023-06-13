import React, {FC} from 'react';
import Modal from '../../components/modal/Modal';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import Order from "../about-order/Order";
import {ROUTE} from "../../constants";

const RoutingModal: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const background = location.state?.background;

  const { items } = useAppSelector((state) => state.ingredients);

  const onModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      {items.length && background && (
      <Routes>
        <Route path={`/ingredients/:id`}  element={
          <Modal title={"Детали ингредиента"} onClose={onModalClose}>
            <IngredientDetails />
          </Modal>
        }>
        </Route>
        <Route path={ROUTE.ORDER_FEED_DETAIL} element={
          <Modal title={"Детали заказа"} onClose={onModalClose}>
            <Order />
          </Modal>
        }/>
        <Route path={ROUTE.USER_ORDER_DETAIL} element={
          <Modal title={"Детали заказа"} onClose={onModalClose}>
            <Order />
          </Modal>
        }/>
      </Routes>
      )}
    </>
  );
};

export default RoutingModal;