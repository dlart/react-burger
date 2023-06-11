import {createAction} from '@reduxjs/toolkit';
import {TOrdersWebSocketResponse} from '../../types/TOrdersWebSocketResponse';

export const userOrdersConnect = createAction<string, 'USER_ORDERS_CONNECT'>('USER_ORDERS_CONNECT');
export const userOrdersDisconnect = createAction('USER_ORDERS_DISCONNECT');
export const userOrdersWebSocketClose = createAction('USER_ORDERS_WEB_SOCKET_CLOSE');
export const userOrdersWebSocketConnecting = createAction('USER_ORDERS_WEB_SOCKET_CONNECTING');
export const userOrdersWebSocketError = createAction<string, 'USER_ORDERS_WEB_SOCKET_ERROR'>('USER_ORDERS_WEB_SOCKET_ERROR');
export const userOrdersWebSocketMessage = createAction<TOrdersWebSocketResponse, 'USER_ORDERS_WEB_SOCKET_MESSAGE'>('USER_ORDERS_WEB_SOCKET_MESSAGE');
export const userOrdersWebSocketOpen = createAction('USER_ORDERS_WEB_SOCKET_OPEN');
