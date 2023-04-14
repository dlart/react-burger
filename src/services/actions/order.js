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
  
    const token = localStorage.getItem('accessToken');
    
    api
      .createOrder(
        ids,
        token,
      )
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
