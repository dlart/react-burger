import type {
    Middleware,
    MiddlewareAPI,
} from 'redux';
import {
    ActionCreatorWithPayload,
    ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../services/store';
import {getUser} from '../services/actions/user';

export type ActionTypes = {
    webSocketClose: ActionCreatorWithoutPayload;
    webSocketConnect: ActionCreatorWithPayload<string>;
    webSocketConnecting: ActionCreatorWithoutPayload;
    webSocketDisconnect: ActionCreatorWithoutPayload;
    webSocketError: ActionCreatorWithPayload<string>;
    webSocketMessage: ActionCreatorWithPayload<any>;
    webSocketOpen: ActionCreatorWithoutPayload;
    webSocketSendMessage?: ActionCreatorWithPayload<any>;
}

export const webSocketMiddleware = (wsActions: ActionTypes): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let webSocket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch } = store;

            const { 
                webSocketClose,
                webSocketConnect,
                webSocketConnecting,
                webSocketDisconnect,
                webSocketError,
                webSocketMessage,
                webSocketOpen,
                webSocketSendMessage,
            } = wsActions;

            if (webSocketConnect.match(action)) {
                webSocket = new WebSocket(action.payload);
                
                dispatch(webSocketConnecting());
            }
            if (webSocket) {
                webSocket.onopen = () => {
                    dispatch(webSocketOpen());
                };

                webSocket.onerror = () => {
                    dispatch(webSocketError('Error'));
                };

                webSocket.onmessage = event => {
                    const data = JSON.parse(event.data);

                    if ('Token error' === data.message) {
                        dispatch(getUser())
                    } else {
                        dispatch(webSocketMessage(data));
                    }
                };

                webSocket.onclose = () => {
                    dispatch(webSocketClose());
                };

                if (webSocketSendMessage?.match(action)) {
                    webSocket.send(JSON.stringify(action.payload));
                }

                if (webSocketDisconnect.match(action)) {
                    if (webSocket.readyState === 1) {
                        webSocket.close();
                    }
                    
                    webSocket = null;
                }
            }

            next(action);
        };
    }) as Middleware;
};