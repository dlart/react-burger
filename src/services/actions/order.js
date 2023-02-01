import orderSlice from '../reducers/order';
import { api } from '../api';

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
      .then((data) => dispatch(requestSuccess({ number: data.order.number })))
      .catch(() => dispatch(requestFailed()))
      .finally(() => dispatch(openModal()))
  }
};
