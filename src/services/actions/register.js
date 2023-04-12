import { api } from '../api';
import registerSlice from '../reducers/register';

export const register = (email, password, name) => {
  const {
    request,
    requestFailed,
    requestSuccess,
  } = registerSlice.actions;

  return dispatch => {
    dispatch(request());

    api
      .register({
        email,
        password,
        name,
      })
      .then((response) => {
        dispatch(requestSuccess());

        const token = response
          .accessToken
          .split('Bearer ')[1];

        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem('token', token);
      })
      .catch(() => {
        dispatch(requestFailed());
        alert('Ошибка регистрации');
      });
  }
};
