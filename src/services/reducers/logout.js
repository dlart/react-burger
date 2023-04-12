import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  request: false,
  requestFailed: false,
  requestSuccess: false,
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
  requestSuccess(state) {
    state.request = false;
    state.requestFailed = false;
    state.requestSuccess = true;
  },
};

export default createSlice({
  initialState,
  name: 'logout',
  reducers,
});
