import api from '../../services/api';
import orderSlice from '../reducers/order';

export const createOrder = (ids) => {
  const {
    openModal,
    request,
    requestFailed,
    requestSuccess,
  } = orderSlice.actions;

  return dispatch => {
    dispatch(request());
    
    api
      .createOrder(ids)
      .then((data) => {
        const orderNumber = data
          .order
          .number;
        
        dispatch(requestSuccess({ number: orderNumber }))
      })
      .catch(() => dispatch(requestFailed()))
      .finally(() => dispatch(openModal()))
  }
};
