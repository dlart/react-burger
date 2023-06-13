import {createReducer} from '@reduxjs/toolkit';
import {WebSocketStatus} from '../../enum/web-socket-status';
import {TWebSocketOrdersResponse} from '../../types/TWebSocketOrdersResponse';
import {
    ordersWebSocketClose,
    ordersWebSocketConnecting,
    ordersWebSocketError,
    ordersWebSocketMessage,
    ordersWebSocketOpen,
} from '../actions/orders';

interface IOrdersState {
    connectingError: string;
    orders: TWebSocketOrdersResponse | null;
    status: WebSocketStatus;
}

const initialState: IOrdersState = {
    connectingError: '',
    orders: null,
    status: WebSocketStatus.OFFLINE,
}

export default createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(
        ordersWebSocketOpen,
        state => {
            state.status = WebSocketStatus.ONLINE;
            state.connectingError = '';
        },
      )
      .addCase(
        ordersWebSocketClose,
        state => {
          state.status = WebSocketStatus.OFFLINE;
          state.connectingError = '';
        },
      )
      .addCase(
        ordersWebSocketError,
        (
          state,
          action,
        ) => {
          state.connectingError = action.payload;
        },
      )
      .addCase(
        ordersWebSocketConnecting,
        state => {
          state.status = WebSocketStatus.CONNECTING
        },
      )
      .addCase(
        ordersWebSocketMessage,
        (
          state,
          action,
      ) => {
        // @ts-ignore
        state.orders = action.payload;
      })
    ;
  },
);
