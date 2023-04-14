import Modal from '../../components/modal/Modal';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import {
  useSelector,
} from 'react-redux';
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

const RoutingModal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const background = location.state?.background;

  const { items } = useSelector((state) => state.ingredients);

  const onModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      {items.length && background && (
      <Routes>
            <Route path={`/ingredients/:id`} element={
                <Modal title={"Детали ингредиента"} onClose={onModalClose}>
                  <IngredientDetails />
                </Modal>
            }>
            </Route>
      </Routes>
      )}
    </>
  );
};

export default RoutingModal;