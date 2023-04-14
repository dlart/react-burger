import Modal from '../../components/modal/Modal';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import {
  useSelector,
} from 'react-redux';
import { useNavigate, useLocation, Route } from "react-router-dom";

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
      {background && (
        <Route path={`/ingredients/:id`}>
          {items.length && (
            <Modal title={"Детали ингредиента"} onClose={onModalClose}>
              <IngredientDetails />
            </Modal>
          )}
        </Route>
      )}
    </>
  );
};

export default RoutingModal;