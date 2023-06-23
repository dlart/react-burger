import reducer, { addIngredient, deleteIngredient, moveIngredient, setBun } from './burgerConstructor'
import { initialState } from './burgerConstructor';

describe('burger constructor test', () => {
  it('should set bun', () => {
    const action = {
      type: setBun,
      payload: {
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
    };
  
    const result = reducer(
      initialState,
      action,
    );
  
    expect(result).toEqual({
      ...initialState,
      bun: action.payload,
      ingredients: []
    });
  });
  
  it('should add ingredient', () => {
    const initialState = {
      bun: null,
      ingredients: [],
    };
    
    const action = {
      type: addIngredient,
      payload: {
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093e',
        calories: 643,
        carbohydrates: 85,
        count: 0,
        fat: 26,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        name: 'Филе Люминесцентного тетраодонтимформа',
        price: 988,
        proteins: 44,
        type: 'main',
      },
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      bun: null,
      ingredients: [action.payload],
    });
  });
  
  it('should delete ingredient', () => {
    const initialState = {
      bun: null,
      ingredients: [{
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093e',
        calories: 643,
        carbohydrates: 85,
        count: 0,
        fat: 26,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        name: 'Филе Люминесцентного тетраодонтимформа',
        price: 988,
        proteins: 44,
        type: 'main',
      }],
    };
    
    const action = {
      type: deleteIngredient,
      payload: 0,
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      bun: null,
      ingredients: [],
    });
  });
  
  it('should move ingredient', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa0941',
          calories: 4242,
          carbohydrates: 242,
          count: 0,
          fat: 142,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          name: 'Биокотлета из марсианской Магнолии',
          price: 424,
          proteins: 420,
          type: 'main',
        },
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093e',
          calories: 643,
          carbohydrates: 85,
          count: 0,
          fat: 26,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          name: 'Филе Люминесцентного тетраодонтимформа',
          price: 988,
          proteins: 44,
          type: 'main',
        },
      ],
    };
    
    const action = {
      type: moveIngredient,
      payload: {
        newIndex: 0,
        oldIndex: 1,
      },
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      bun: null,
      ingredients: [
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093e',
          calories: 643,
          carbohydrates: 85,
          count: 0,
          fat: 26,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          name: 'Филе Люминесцентного тетраодонтимформа',
          price: 988,
          proteins: 44,
          type: 'main',
        },
        {
          __v: 0,
          _id: '643d69a5c3f7b9001cfa0941',
          calories: 4242,
          carbohydrates: 242,
          count: 0,
          fat: 142,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          name: 'Биокотлета из марсианской Магнолии',
          price: 424,
          proteins: 420,
          type: 'main',
        },
      ],
    });
  });
});
