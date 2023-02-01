import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: {},
  modalOpen: false,
};

const reducers = {
  closeModal(state) {
    state.item = {};
    state.modalOpen = false;
  },
  openModal(state, action) {
    state.item = action.payload;
    state.modalOpen = true;
  },
};

export default createSlice({
  initialState,
  name: 'ingredient',
  reducers,
});
