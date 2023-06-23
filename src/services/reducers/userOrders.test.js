import {WebSocketStatus} from '../../enum/web-socket-status';
import {
  userOrdersWebSocketClose,
  userOrdersWebSocketConnecting,
  userOrdersWebSocketError,
  userOrdersWebSocketMessage,
  userOrdersWebSocketOpen,
} from '../actions/userOrders';
import reducer from './userOrders';
import { initialState } from './userOrders';

describe('user orders test', () => {
  it('should handle web socket close', () => {
    const action = {
      type: userOrdersWebSocketClose,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      status: WebSocketStatus.OFFLINE
    });
  });
  
  it('should handle web socket connecting', () => {
    const action = {
      type: userOrdersWebSocketConnecting,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      status: WebSocketStatus.CONNECTING
    });
  });
  
  it('should handle web socket error', () => {
    const action = {
      type: userOrdersWebSocketError,
      payload: 'Oops... Something wrong...'
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      connectingError: action.payload
    });
  });
  
  it('should handle web socket message', () => {
    const action = {
      type: userOrdersWebSocketMessage,
      payload: {
        orders: [
          {
            _id: '64918ba18a4b62001c85f47b',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0945',
              '643d69a5c3f7b9001cfa093f',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa093c',
            ],
            status: 'done',
            name: 'Антарианский бессмертный space краторный бургер',
            createdAt: '2023-06-20T11:21:05.626Z',
            updatedAt: '2023-06-20T11:21:05.721Z',
            number: 9423
          }
        ],
        success: true,
        total: 777,
        totalToday: 77
      }
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      orders: action.payload
    });
  });
  
  it('should handle web socket open', () => {
    
    const action = {
      type: userOrdersWebSocketOpen
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      status: WebSocketStatus.ONLINE
    });
  });
});

