import _ from 'underscore';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: {},
  ingredients: [],
  totalPrice: 0,
};

const reducers = {
  addIngredient(state, action) {
    state.ingredients.push(action.payload);
  },
  calcTotalPrice(state) {
    state.totalPrice = (
      _.isEmpty(state.bun)
        ? (
          state.ingredients.length
            ? state.ingredients.reduce((a, b) => a + b.price, 0)
            : 0
        )
        : (
          state.bun.price * 2
          + state.ingredients.reduce(
            (a, b) => a + b.price,
            0,
          )
        )
    );
  },
  deleteIngredient(state, action) {
    state.ingredients.splice(action.payload, 1);
  }
  ,
  moveIngredient (state, action) {
    const ingredient = state
      .ingredients
      .splice(action.payload.oldIndex, 1)
      .shift();

    state
      .ingredients
      .splice(
        action.payload.newIndex,
        0,
        ingredient,
      );
  },
  resetIngredients(state) {
    state.ingredients = [];
  },
  setBun(state, action) {
    state.bun = action.payload;
  },
}

export default createSlice({
  initialState,
  name: 'constructor',
  reducers,
});
