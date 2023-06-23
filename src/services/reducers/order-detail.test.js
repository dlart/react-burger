import reducer from './order-detail';
import { getOrderDetails } from '../actions/orderDetail';

describe('order detail test', () => {
  let initialState = {
    order: null,
    loading: false,
    error: null,
  };
  
  it('should handle pending', () => {
    const action = {
      type: getOrderDetails
        .pending
        .type
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      loading: true,
    });
  });
  
  it('should handle fulfilled', () => {
    const action = {
      type: getOrderDetails
        .fulfilled
        .type,
      payload: {
        success: true,
        name: "Люминесцентный флюоресцентный бургер",
        order: {
          ingredients: [
            {
              _id: "643d69a5c3f7b9001cfa093d",
              name: "Флюоресцентная булка R2-D3",
              type: "bun",
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: "https://code.s3.yandex.net/react/code/bun-01.png",
              image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
              image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
              __v: 0
            },
            {
              '_id': "643d69a5c3f7b9001cfa093e",
              'name': "Филе Люминесцентного тетраодонтимформа",
              'type': "main",
              'proteins': 44,
              'fat': 26,
              'carbohydrates': 85,
              'calories': 643,
              'price': 988,
              'image': "https://code.s3.yandex.net/react/code/meat-03.png",
              'image_mobile': "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
              'image_large': "https://code.s3.yandex.net/react/code/meat-03-large.png",
              '__v': 0
            }
          ],
          '_id': "6491845b8a4b62001c85f465",
          'owner': {
            'name': "Denis",
            'email': "denis.lityagin@gmail.com",
            'createdAt': "2023-06-04T12:31:20.801Z",
            'updatedAt': "2023-06-07T14:34:43.349Z"
          },
          'status': "done",
          'name': "Люминесцентный флюоресцентный бургер",
          'createdAt': "2023-06-20T10:50:03.452Z",
          'updatedAt': "2023-06-20T10:50:03.605Z",
          'number': 9421,
          'price': 1976
        },
      },
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      loading: false,
      order: action.payload,
    });
  });
  
  it('should handle rejected', () => {
    const action = {
      type: getOrderDetails
        .rejected
        .type,
      error: {
        message: 'Oops... Something wrong...'
      }
    };
    
    const result = reducer(
      initialState,
      action,
    );
    
    expect(result).toEqual({
      ...initialState,
      error: action.error.message,
      loading: false,
    });
  });
});