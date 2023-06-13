import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createOrder} from "../actions/order";
import {TCreateOrderSuccessResponse} from "../../types/TCreateOrderSuccessResponse";

interface IOrderState {
  modalOpen: boolean;
  number: number | null;
  request: boolean;
  requestFailed: boolean;
  requestSuccess: boolean;
}

const initialState: IOrderState = {
  modalOpen: false,
  number: null,
  request: false,
  requestFailed: false,
  requestSuccess: false,
};

const reducers = {
  closeModal(state: IOrderState) {
    state.modalOpen = false;
  },
  openModal(state: IOrderState) {
    state.modalOpen = true;
  },
};

const order = createSlice({
  initialState,
  name: 'order',
  reducers,
  extraReducers: builder => {
    builder
      .addCase(
        createOrder.pending,
        state => {
          state.request = true;
          state.requestFailed = false;
          state.requestSuccess = false;
        },
      )
      .addCase(
        createOrder.fulfilled,
        (
            state,
            action: PayloadAction<TCreateOrderSuccessResponse>,
        ) => {
          state.number = action
              .payload
              .order
              .number;
          state.modalOpen = true;
          state.request = false;
          state.requestFailed = false;
          state.requestSuccess = true;
        },
      )
      .addCase(
        createOrder.rejected,
        state => {
          state.request = false;
          state.requestFailed = true;
          state.requestSuccess = false;
        },
      )
    ;
  },
});

export default order.reducer;

export const {
  closeModal,
  openModal,
} = order.actions;
