import {webSocketMiddleware} from './web-socket-middleware';
import {
    ordersConnect,
    ordersDisconnect,
    ordersWebSocketClose,
    ordersWebSocketConnecting,
    ordersWebSocketError,
    ordersWebSocketMessage,
    ordersWebSocketOpen
} from '../services/actions/orders';

export const OrdersMiddleware = webSocketMiddleware({
    webSocketClose: ordersWebSocketClose,
    webSocketConnect: ordersConnect,
    webSocketConnecting: ordersWebSocketConnecting,
    webSocketDisconnect: ordersDisconnect,
    webSocketError: ordersWebSocketError,
    webSocketMessage: ordersWebSocketMessage,
    webSocketOpen: ordersWebSocketOpen,
});
