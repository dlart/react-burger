import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  request: false,
  requestFailed: false,
  requestSuccess: false,
};

const reducers = {
  decreaseCount(state, action) {
    state.items = [...state.items].map(item => (
      item._id === action.payload
        ? {
          ...item,
          count: --item.count,
        }
        : item
      )
    );
  },
  increaseCount(state, action) {
    state.items = [...state.items].map(item => (
      item._id === action.payload
        ? {
          ...item,
          count: ++item.count,
        }
        : item
      )
    );
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
    state.items = action.payload.map(item => ({ ...item, count: 0 }));
    state.request = false;
    state.requestFailed = false;
    state.requestSuccess = true;
  },
  resetCount(state) {
    state.items = [...state.items].map(item => ({
      ...item,
      count: 0,
    }));
  },
};

export default createSlice({
  initialState,
  name: 'ingredients',
  reducers,
});
