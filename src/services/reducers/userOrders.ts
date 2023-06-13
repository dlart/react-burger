import {createReducer} from '@reduxjs/toolkit';
import {WebSocketStatus} from '../../enum/web-socket-status';
import {TWebSocketOrdersResponse} from '../../types/TWebSocketOrdersResponse';
import {
    userOrdersWebSocketClose,
    userOrdersWebSocketConnecting,
    userOrdersWebSocketError,
    userOrdersWebSocketMessage,
    userOrdersWebSocketOpen,
} from '../actions/userOrders';

interface IUserOrdersState {
    connectingError: string;
    orders: TWebSocketOrdersResponse | null;
    status: WebSocketStatus;
}

const initialState: IUserOrdersState = {
    connectingError: '',
    orders: null,
    status: WebSocketStatus.OFFLINE,
}

export default createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(
        userOrdersWebSocketOpen,
        state => {
            state.status = WebSocketStatus.ONLINE;
            state.connectingError = '';
        },
      )
      .addCase(
        userOrdersWebSocketClose,
        state => {
          state.status = WebSocketStatus.OFFLINE;
          state.connectingError = '';
        },
      )
      .addCase(
        userOrdersWebSocketError,
        (
          state,
          action,
        ) => {
          state.connectingError = action.payload;
        },
      )
      .addCase(
        userOrdersWebSocketConnecting,
        state => {
          state.status = WebSocketStatus.CONNECTING
        },
      )
      .addCase(
        userOrdersWebSocketMessage,
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
