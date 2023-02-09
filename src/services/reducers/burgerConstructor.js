import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: {},
  ingredients: [],
};

const reducers = {
  addIngredient(state, action) {
    state.ingredients.push(action.payload);
  },
  deleteIngredient(state, action) {
    state.ingredients.splice(action.payload, 1);
  },
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
