import {webSocketMiddleware} from './web-socket-middleware';
import {
    userOrdersConnect,
    userOrdersDisconnect,
    userOrdersWebSocketClose,
    userOrdersWebSocketConnecting,
    userOrdersWebSocketError,
    userOrdersWebSocketMessage,
    userOrdersWebSocketOpen
} from '../services/actions/userOrders';

export const UserOrdersMiddleware = webSocketMiddleware({
    webSocketClose: userOrdersWebSocketClose,
    webSocketConnect: userOrdersConnect,
    webSocketConnecting: userOrdersWebSocketConnecting,
    webSocketDisconnect: userOrdersDisconnect,
    webSocketError: userOrdersWebSocketError,
    webSocketMessage: userOrdersWebSocketMessage,
    webSocketOpen: userOrdersWebSocketOpen,
});
