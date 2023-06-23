import {createSlice, PayloadAction,} from '@reduxjs/toolkit';
import {IConstructorIngredient} from '../../types/IConstructorIngredient';

interface IBurgerConstructorState {
  bun: IConstructorIngredient | null;
  ingredients: IConstructorIngredient[];
}

export const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

const reducers = {
  addIngredient(
      state: IBurgerConstructorState,
      action: PayloadAction<IConstructorIngredient>,
  ): void {
    state
        .ingredients
        .push(action.payload);
  },
  deleteIngredient(
      state: IBurgerConstructorState,
      action: PayloadAction<number>,
  ): void {
    state
        .ingredients
        .splice(
            action.payload,
            1,
        );
  },
  moveIngredient (
      state: IBurgerConstructorState,
      action: PayloadAction<{
        newIndex: number;
        oldIndex: number;
      }>
  ) {
    state
      .ingredients
      .splice(
        action.payload.newIndex,
        0,
        state.ingredients.splice(
          action.payload.oldIndex,
          1,
        )[0],
      );
  },
  setBun(
      state: IBurgerConstructorState,
      action: PayloadAction<IConstructorIngredient>,
  ) {
    state.bun = action.payload;
  },
}

const burgerConstructor = createSlice({
  initialState,
  name: 'constructor',
  reducers,
});

export default burgerConstructor.reducer;

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  setBun,
} = burgerConstructor.actions;
