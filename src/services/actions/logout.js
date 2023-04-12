import { api } from '../api';
import logoutSlice from '../reducers/logout';

export const logout = (refreshToken) => {
  const {
    request,
    requestFailed,
    requestSuccess,
  } = logoutSlice.actions;

  return dispatch => {
    dispatch(request());

    api
      .logout(refreshToken)
      .then((response) => {
        dispatch(requestSuccess());

        localStorage.removeItem('token');
        localStorage.removeItem("refreshToken");
      })
      .catch(() => {
        dispatch(requestFailed());
        alert('Ошибка при выходе');
      });
  }
};
