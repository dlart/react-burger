import { createOrder } from '../actions/order';
import reducer from './order';
import { openModal } from './order'
import { closeModal } from './order'

describe('order test', () => {
  let initialState = {
    modalOpen: false,
    number: null,
    request: false,
    requestFailed: false,
    requestSuccess: false,
  };
  
  it('should handle pending', () => {
    const action = {
      type: createOrder
        .pending
        .type
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      request: true,
    });
  });
  
  it('should handle fulfilled', () => {
    const action = {
      type: createOrder
        .fulfilled
        .type,
      payload: {
        order: {
          number: 123,
        }
      },
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      request: false,
      requestSuccess: true,
      number: action.payload.order.number,
      modalOpen: true,
    });
  });
  
  it('should handle rejected', () => {
    const action = {
      type: createOrder
        .rejected
        .type,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      requestFailed: true,
    });
  });
  
  it('should open modal', () => {
    const action = {
      type: openModal,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      modalOpen: true,
    });
  });
  
  it('should close modal', () => {
    const action = {
      type: closeModal,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      modalOpen: false,
    });
  });
});