import api from '../../services/api';
import userSlice from '../reducers/user';

export const logout = () => {
  const {
    logoutRequest,
    logoutRequestFailed,
    logoutRequestSuccess,
  } = userSlice.actions;
  
  return dispatch => {
    dispatch(logoutRequest());
    
    api
    .logout(localStorage.getItem('refreshToken'))
    .then(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      dispatch(logoutRequestSuccess());
    })
    .catch(() => dispatch(logoutRequestFailed()));
  };
};

export const login = ({
  email,
  password,
}) => {
  const {
    loginRequest,
    loginRequestFailed,
    loginRequestSuccess,
  } = userSlice.actions;
  
  return dispatch => {
    dispatch(loginRequest());
    
    api
      .login({
        email,
        password,
      })
    .then(({
      accessToken,
      refreshToken,
      user,
    }) => {
      localStorage.setItem(
        'accessToken',
        accessToken,
      );
  
      localStorage.setItem(
        'refreshToken',
        refreshToken,
      );
      
      dispatch(loginRequestSuccess(user));
    })
    .catch(() => dispatch(loginRequestFailed()));
  };
};

export const register = (
  email,
  password,
  name,
) => {
  const {
    registerRequest,
    registerRequestFailed,
    registerRequestSuccess,
  } = userSlice.actions;
  
  return dispatch => {
    dispatch(registerRequest());
    
    api
      .register({
        email,
        password,
        name,
      })
      .then(({
        accessToken,
        refreshToken,
        user,
      }) => {
        localStorage.setItem(
          'accessToken',
          accessToken,
        );
        localStorage.setItem(
          'refreshToken',
          refreshToken,
        );
    
        dispatch(registerRequestSuccess(user));
      })
      .catch(() => dispatch(registerRequestFailed()));
  }
};

export const getUser = () => {
  const {
    request,
    requestFailed,
    requestSuccess,
  } = userSlice.actions;

  return dispatch => {
    dispatch(request());
    
    const token = localStorage.getItem('accessToken');

    api
      .getUser(token)
      .then((response) => dispatch(requestSuccess(response)))
      .catch(response => {
        response
        .json()
        .then(response => {
          false === response.success
            && 'jwt expired' === response.message
              ? dispatch(refreshToken())
              : dispatch(requestFailed());
        });
      });
  }
};

export const refreshToken = () => {
  const {
    refreshTokenRequest,
    refreshTokenRequestFailed,
    refreshTokenRequestSuccess,
  } = userSlice.actions;
  
  return dispatch => {
    dispatch(refreshTokenRequest());
    
    const refreshToken = localStorage.getItem('refreshToken');
    
    api
      .refreshToken(refreshToken)
      .then(({
        accessToken,
        refreshToken,
      }) => {
        localStorage.setItem(
          'accessToken',
          accessToken,
        );
  
        localStorage.setItem(
          'refreshToken',
          refreshToken,
        );
        
        dispatch(refreshTokenRequestSuccess());
      })
      .catch(() => dispatch(refreshTokenRequestFailed()));
  };
}

export const updateUser = ({
  email,
  name,
  password,
}) => {
  const {
    updateRequest,
    updateRequestFailed,
    updateRequestSuccess,
  } = userSlice.actions;

  return dispatch => {
    dispatch(updateRequest());
    
    const token = localStorage.getItem('accessToken');

    api
      .updateUser(
        token,
        {
          email,
          name,
          password,
        }
      )
      .then(response => dispatch(updateRequestSuccess(response)))
      .catch(() => dispatch(updateRequestFailed()));
  }
};
