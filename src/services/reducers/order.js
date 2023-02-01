import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalOpen: false,
  number: null,
  request: false,
  requestFailed: false,
  requestSuccess: false,
};

const reducers = {
  closeModal(state) {
    state.modalOpen = false;
  },
  openModal(state) {
    state.modalOpen = true;
  },
  request(state) {
    state.request = true;
    state.requestFailed = false;
    state.requestSuccess = false;
  },
  requestFailed(state) {
    state.number = null
    state.request = false;
    state.requestFailed = true;
    state.requestSuccess = false;
  },
  requestSuccess(state, action) {
    state.number = action.payload.number;
    state.request = false;
    state.requestFailed = false;
    state.requestSuccess = true;
  },
};

export default createSlice({
  initialState,
  name: 'order',
  reducers,
})
