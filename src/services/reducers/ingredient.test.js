import { closeModal, openModal } from './ingredient'
import reducer from './ingredient';

describe('ingredient test', () => {
  it('should close modal', () => {
    const initialState = {
      item: {
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
      modalOpen: true,
    };
  
    const action = {
      type: closeModal,
    };
  
    const result = reducer(
      initialState,
      action,
    );
  
    expect(result).toEqual({
      ...initialState,
      item: null,
      modalOpen: false,
    });
  });
  
  it('should open modal', () => {
    const initialState = {
      item: null,
      modalOpen: false,
    };
    
    const action = {
      type: openModal,
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
      item: {
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
      modalOpen: true,
    });
  });
});
