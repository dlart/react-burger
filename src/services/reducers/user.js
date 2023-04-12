import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  request: false,
  requestFailed: false,
  requestSuccess: false,
  user: {
    name: '',
    email: '',
    password: '',
  },
};

const reducers = {
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
      email: action.payload.email,
      name: action.payload.name,
    };
  },

};

export default createSlice({
  initialState,
  name: 'user',
  reducers,
});
