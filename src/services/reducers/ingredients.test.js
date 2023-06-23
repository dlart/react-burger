import { getIngredients } from '../actions/ingredients';
import reducer, { decreaseCount, increaseCount, resetCount } from './ingredients'

describe('ingredients test', () => {
  let initialState = {
    items: [],
    request: false,
    requestFailed: false,
    requestSuccess: false,
  };
  
  it('should handle pending', () => {
    const action = {
      type: getIngredients
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
    const ingredients = [
      {
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093c',
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        name: 'Краторная булка N-200i',
        price: 1255,
        proteins: 80,
        type: 'bun',
      },
    ];
    
    const action = {
      type: getIngredients
        .fulfilled
        .type,
      payload: ingredients,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      request: false,
      requestSuccess: true,
      items: [
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c',
          calories: 420,
          carbohydrates: 53,
          count: 0,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
        }
      ],
    });
  });
  
  it('should handle rejected', () => {
    const action = {
      type: getIngredients
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
  
  it('should increase count', () => {
    initialState = {
      ...initialState,
      items: [
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c',
          calories: 420,
          carbohydrates: 53,
          count: 0,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
        }
      ],
    };
  
    const action = {
      type: increaseCount,
      payload: '643d69a5c3f7b9001cfa093c',
    };
  
    const result = reducer(
      initialState,
      action,
    );
  
    expect(result).toEqual({
      ...initialState,
      items: [
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c',
          calories: 420,
          carbohydrates: 53,
          count: 1,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
        },
      ],
    });
  });
  
  it('should decrease count', () => {
    initialState = {
      ...initialState,
      items: [
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c',
          calories: 420,
          carbohydrates: 53,
          count: 1,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
        }
      ],
    };
  
    const action = {
      type: decreaseCount,
      payload: '643d69a5c3f7b9001cfa093c',
    };
  
    const result = reducer(
      initialState,
      action,
    );
  
    expect(result).toEqual({
      ...initialState,
      items: [
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c',
          calories: 420,
          carbohydrates: 53,
          count: 0,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
        },
      ],
    });
  });
  
  it('should reset count', () => {
    initialState = {
      ...initialState,
      items: [
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c',
          calories: 420,
          carbohydrates: 53,
          count: 2,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
        }
      ],
    };
  
    const action = {
      type: resetCount,
    };
  
    const result = reducer(
      initialState,
      action,
    );
  
    expect(result).toEqual({
      ...initialState,
      items: [
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c',
          calories: 420,
          carbohydrates: 53,
          count: 0,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
        },
      ],
    });
  });
});
