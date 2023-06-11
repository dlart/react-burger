import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchWithRefresh,
  loginUser as loginUserApi,
  logoutUser as logoutUserApi,
  refreshToken as refreshTokenApi,
  registerUser as registerUserApi,
  resetPasswordRequest as resetPasswordRequestApi,
  resetPasswordReset as resetPasswordResetApi,
  updateUser as updateUserApi,
} from '../../utils/api'
import { API } from '../../constants';

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    const token = localStorage.getItem('accessToken');
    
    return await fetchWithRefresh(
      API.AUTH.USER,
      {
        method: 'GET',
        headers: {
          'Authorization': token ?? '',
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  updateUserApi,
);

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  refreshTokenApi,
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  loginUserApi,
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  logoutUserApi,
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi,
);

export const resetPasswordRequest = createAsyncThunk(
  'user/resetPasswordRequest',
  resetPasswordRequestApi,
);

export const resetPasswordReset = createAsyncThunk(
  'user/resetPasswordReset',
  resetPasswordResetApi,
);
