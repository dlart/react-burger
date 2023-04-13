import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loginRequest: false,
  loginRequestFailed: false,
  loginRequestSuccess: false,
  logoutRequest: false,
  logoutRequestFailed: false,
  logoutRequestSuccess: false,
  refreshTokenRequest: false,
  refreshTokenRequestFailed: false,
  refreshTokenRequestSuccess: false,
  registerRequest: false,
  registerRequestFailed: false,
  registerRequestSuccess: false,
  request: false,
  requestFailed: false,
  requestSuccess: false,
  updateRequest: false,
  updateRequestFailed: false,
  updateRequestSuccess: false,
  user: {
    name: '',
    email: '',
    password: '',
  },
};

const reducers = {
  loginRequest(state) {
    state.isLoggedIn = false;
    state.loginRequest = true;
    state.loginRequestFailed = false;
    state.loginRequestSuccess = false;
  },
  loginRequestFailed(state) {
    state.isLoggedIn = false;
    state.loginRequest = false;
    state.loginRequestFailed = true;
    state.loginRequestSuccess = false;
  },
  loginRequestSuccess(
    state,
    action,
  ) {
    state.isLoggedIn = true;
    state.loginRequest = false;
    state.loginRequestFailed = false;
    state.loginRequestSuccess = true;
    state.user = {
      ...state.user,
      ...action.payload,
    };
  },
  logoutRequest(state) {
    state.logoutRequest = true;
    state.logoutRequestFailed = false;
    state.logoutRequestSuccess = false;
  },
  logoutRequestFailed(state) {
    state.logoutRequest = false;
    state.logoutRequestFailed = true;
    state.logoutRequestSuccess = false;
  },
  logoutRequestSuccess(state) {
    state.isLoggedIn = false;
    state.logoutRequest = false;
    state.logoutRequestFailed = false;
    state.logoutRequestSuccess = true;
  },
  refreshTokenRequest(state) {
    state.refreshTokenrRequest = true;
    state.refreshTokenRequestFailed = false;
    state.refreshTokenRequestSuccess = false;
  },
  refreshTokenRequestFailed(state) {
    state.isLoggedIn = false;
    state.refreshTokenRequest = false;
    state.refreshTokenRequestFailed = true;
    state.refreshTokenRequestSuccess = false;
  },
  refreshTokenRequestSuccess(state) {
    state.isLoggedIn = true;
    state.refreshTokenRequest = false;
    state.refreshTokenRequestFailed = false;
    state.refreshTokenRequestSuccess = true;
  },
  registerRequest(state) {
    state.registerRequest = true;
    state.registerRequestFailed = false;
    state.registerRequestSuccess = false;
  },
  registerRequestFailed(state) {
    state.registerRequest = false;
    state.registerRequestFailed = true;
    state.registerRequestSuccess = false;
  },
  registerRequestSuccess(
    state,
    action,
  ) {
    state.registerRequest = false;
    state.registerRequestFailed = false;
    state.registerRequestSuccess = true;
    state.user = {
      ...state.user,
      ...action.payload,
    };
  },
  request(state) {
    state.request = true;
    state.requestFailed = false;
    state.requestSuccess = false;
  },
  requestFailed(state) {
    state.request = false;
    state.requestFailed = true;
    state.requestSuccess = false;
  },
  requestSuccess(state, action) {
    state.request = false;
    state.requestFailed = false;
    state.requestSuccess = true;
    state.user = {
      ...state.user,
      ...action.payload,
    };
  },
  updateRequest(state) {
    state.updateRequest = true;
    state.updateRequestFailed = false;
    state.updateRequestSuccess = false;
  },
  updateRequestFailed(state) {
    state.updateRequest = false;
    state.updateRequestFailed = true;
    state.updateRequestSuccess = false;
  },
  updateRequestSuccess(
    state,
    action,
  ) {
    state.updateRequest = false;
    state.updateRequestFailed = false;
    state.updateRequestSuccess = true;
    state.user = {
      ...state.user,
      ...action.payload,
    };
  },
};

export default createSlice({
  initialState,
  name: 'user',
  reducers,
});
