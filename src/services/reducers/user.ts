import {createSlice,} from '@reduxjs/toolkit';
import {TProfileUser} from "../../types/TProfileUser";
import {getUser, loginUser, logoutUser, resetPasswordRequest, resetPasswordReset, updateUser} from "../actions/user";

interface IUserState {
  isLoggedIn: boolean;
  loginRequest: boolean;
  loginRequestFailed: boolean;
  loginRequestSuccess: boolean;
  logoutRequest: boolean;
  logoutRequestFailed: boolean;
  logoutRequestSuccess: boolean;
  refreshTokenRequest: boolean;
  refreshTokenRequestFailed: boolean;
  refreshTokenRequestSuccess: boolean;
  registerRequest: boolean;
  registerRequestFailed: boolean;
  registerRequestSuccess: boolean;
  request: boolean;
  requestFailed: boolean;
  requestSuccess: boolean;
  resetPasswordRequest: boolean;
  resetPasswordRequestFailed: boolean;
  resetPasswordRequestSuccess: boolean;
  resetPasswordResetRequest: boolean;
  resetPasswordResetRequestFailed: boolean;
  resetPasswordResetRequestSuccess: boolean;
  updateRequest: boolean;
  updateRequestFailed: boolean;
  updateRequestSuccess: boolean;
  user: TProfileUser | null;
}

export const initialState: IUserState = {
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
  user: null,
  resetPasswordRequest: false,
  resetPasswordRequestFailed: false,
  resetPasswordRequestSuccess: false,
  resetPasswordResetRequest: false,
  resetPasswordResetRequestFailed: false,
  resetPasswordResetRequestSuccess: false,
};

const reducers = {};

const user = createSlice({
  initialState,
  name: 'user',
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(
        getUser.pending,
        state => {
          state.request = true;
          state.requestFailed = false;
          state.requestSuccess = false;
        },
      )
      .addCase(
        getUser.fulfilled,
        (
          state,
          action: any,
        ) => {
          state.request = false;
          state.requestFailed = false;
          state.requestSuccess = true;
          state.isLoggedIn = true;
          state.user = {
            name: action.payload.user.name,
            email: action.payload.user.email,
            password: '',
          };
        },
      )
      .addCase(
        getUser.rejected,
        state => {
          state.request = false;
          state.requestFailed = true;
          state.requestSuccess = false;
        },
      )
      .addCase(
        updateUser.pending,
        state => {
          state.updateRequest = true;
          state.updateRequestFailed = false;
          state.updateRequestSuccess = false;
        },
      )
      .addCase(
        updateUser.fulfilled,
        (
          state,
          action,
        ) => {
          state.updateRequest = false;
          state.updateRequestFailed = false;
          state.updateRequestSuccess = true;
          state.user = {
            name: action.payload.user.name as string,
            email: action.payload.user.email as string,
            password: '',
          };
      })
      .addCase(
        updateUser.rejected,
        (
          state,
          action,
        ) => {
          state.updateRequest = false;
          state.updateRequestFailed = true;
          state.updateRequestSuccess = false;
        },
      )
      .addCase(
        resetPasswordRequest.pending,
        state => {
          state.resetPasswordRequest = true;
          state.resetPasswordRequestFailed = false;
          state.resetPasswordRequestSuccess = false;
        },
      )
      .addCase(
        resetPasswordRequest.fulfilled,
        state => {
          state.resetPasswordRequest = false;
          state.resetPasswordRequestFailed = false;
          state.resetPasswordRequestSuccess = true;
        },
      )
      .addCase(
        resetPasswordRequest.rejected,
        state => {
          state.resetPasswordRequest = false;
          state.resetPasswordRequestFailed = true;
          state.resetPasswordRequestSuccess = false;
        },
      )
      .addCase(
        resetPasswordReset.pending,
        state => {
          state.resetPasswordResetRequest = true;
          state.resetPasswordResetRequestFailed = false;
          state.resetPasswordResetRequestSuccess = false;
        },
      )
      .addCase(
        resetPasswordReset.fulfilled,
        state => {
          state.resetPasswordResetRequest = false;
          state.resetPasswordResetRequestFailed = false;
          state.resetPasswordResetRequestSuccess = true;
        },
      )
      .addCase(
        resetPasswordReset.rejected,
        state => {
          state.resetPasswordResetRequest = false;
          state.resetPasswordResetRequestFailed = true;
          state.resetPasswordResetRequestSuccess = false;
        },
      )
      .addCase(
        logoutUser.pending,
        state => {
          state.logoutRequest = true;
          state.logoutRequestFailed = false;
          state.logoutRequestSuccess = false;
        },
      )
      .addCase(
        logoutUser.fulfilled,
        state => {
          state.logoutRequest = false;
          state.logoutRequestFailed = false;
          state.logoutRequestSuccess = true;
          state.isLoggedIn = false;
          state.user = {
            name: '',
            email: '',
            password: '',
          };
        },
      )
      .addCase(
        logoutUser.rejected,
        state => {
          state.logoutRequest = false;
          state.logoutRequestFailed = true;
          state.logoutRequestSuccess = false;
        },
      )
      .addCase(
        loginUser.pending,
        state => {
          state.loginRequest = true;
          state.loginRequestFailed = false;
          state.loginRequestSuccess = false;
        },
      )
      .addCase(
        loginUser.fulfilled,
          (state, action: any) => {
          state.loginRequest = false;
          state.loginRequestFailed = false;
          state.loginRequestSuccess = true;
          state.isLoggedIn = true;
          state.user = {
            name: action.payload.user.name as string,
            email: action.payload.user.email as string,
            password: '',
          };
        },
      )
      .addCase(
        loginUser.rejected,
        state => {
          state.loginRequest = false;
          state.loginRequestFailed = true;
          state.loginRequestSuccess = false;
        },
      )
    ;
  },
});

export default user.reducer;
