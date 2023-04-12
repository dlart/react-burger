import { api } from '../api';
import userSlice from '../reducers/user';

export const getUser = (token) => {
  const {
    request,
    requestFailed,
    requestSuccess,
  } = userSlice.actions;

  return dispatch => {
    dispatch(request());

    api
      .getUser(token)
      .then((response) => {
        dispatch(requestSuccess(response));
      })
      .catch((e) => {
        dispatch(requestFailed());
        //alert('Ошибка при получении пользователя');
      });
  }
};

export const updateUser = (token, user) => {
  const {
    request,
    requestFailed,
    requestSuccess,
  } = userSlice.actions;

  return dispatch => {
    dispatch(request());

    api
    .updateUser(token, user)
    .then((response) => {
      dispatch(requestSuccess());
    })
    .catch(() => {
      dispatch(requestFailed());
      alert('Ошибка при получении пользователя');
    });
  }
};
