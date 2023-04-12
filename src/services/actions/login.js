import { api } from '../api';
import loginSlice from '../reducers/login';

export const login = (
  email,
  password,
) => {
  const {
    request,
    requestFailed,
    requestSuccess,
  } = loginSlice.actions;

  return dispatch => {
    dispatch(request());

    api
      .login({email, password})
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
        alert('Ошибка аутентификации');
      });
  }
};
