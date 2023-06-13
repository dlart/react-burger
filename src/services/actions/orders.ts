import {createAction} from '@reduxjs/toolkit';
import {TOrdersWebSocketResponse} from "../../types/TOrdersWebSocketResponse";

export const ordersConnect = createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT');
export const ordersDisconnect = createAction('ORDERS_DISCONNECT');
export const ordersWebSocketClose = createAction('ORDERS_WEB_SOCKET_CLOSE');
export const ordersWebSocketConnecting = createAction('ORDERS_WEB_SOCKET_CONNECTING');
export const ordersWebSocketError = createAction<string, 'ORDERS_WEB_SOCKET_ERROR'>('ORDERS_WEB_SOCKET_ERROR');
export const ordersWebSocketMessage = createAction<TOrdersWebSocketResponse, 'ORDERS_WEB_SOCKET_MESSAGE'>('ORDERS_WEB_SOCKET_MESSAGE');
export const ordersWebSocketOpen = createAction('ORDERS_WEB_SOCKET_OPEN');
