import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IConstructorIngredient} from "../../types/IConstructorIngredient";
import {IIngredient} from "../../types/IIngredient";
import {getIngredients} from "../actions/ingredients";

interface IIngredientsState {
  items: IConstructorIngredient[];
  request: boolean,
  requestFailed: boolean,
  requestSuccess: boolean,
}

const initialState: IIngredientsState = {
  items: [],
  request: false,
  requestFailed: false,
  requestSuccess: false,
};

const reducers = {
  decreaseCount(
      state: IIngredientsState,
      action: PayloadAction<string>,
  ) {
    state.items = [...state.items].map(item => (
      item._id === action.payload
        ? {
          ...item,
          count: --item.count,
        }
        : item
      )
    );
  },
  increaseCount(
      state: IIngredientsState,
      action: PayloadAction<string>,
  ) {
    state.items = [...state.items].map(item => (
      item._id === action.payload
        ? {
          ...item,
          count: ++item.count,
        }
        : item
      )
    );
  },
  resetCount(state: IIngredientsState) {
    state.items = [...state.items].map(item => ({
      ...item,
      count: 0,
    }));
  },
};

const slice = createSlice({
  initialState,
  name: 'ingredients',
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(
        getIngredients.pending,
        state => {
          state.request = true;
          state.requestFailed = false;
          state.requestSuccess = false;
        },
      )
      .addCase(
        getIngredients.fulfilled,
        (
            state,
            action: PayloadAction<IIngredient[]>
        ) => {
          state.items = [...action.payload].map(item => ({
            ...item,
            count: 0,
          }));
          state.request = false;
          state.requestFailed = false;
          state.requestSuccess = true;
        },
      )
      .addCase(
        getIngredients.rejected,
        state => {
          state.request = false;
          state.requestFailed = true;
          state.requestSuccess = false;
        },
      )
  },
});

export default slice.reducer;

export const {
  decreaseCount,
  increaseCount,
  resetCount,
} = slice.actions;
