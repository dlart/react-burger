import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IConstructorIngredient } from '../../types/IConstructorIngredient';

interface IIngredientState {
  item: IConstructorIngredient | null,
  modalOpen: boolean,
}

export const initialState: IIngredientState = {
  item: null,
  modalOpen: false,
};

const reducers = {
  closeModal(state: IIngredientState) {
    state.item = null;
    state.modalOpen = false;
  },
  openModal(
      state: IIngredientState,
      action: PayloadAction<IConstructorIngredient>,
  ) {
    state.item = action.payload;
    state.modalOpen = true;
  },
};

const ingredient = createSlice({
  initialState,
  name: 'ingredient',
  reducers,
});

export default ingredient.reducer;

export const {
  closeModal,
  openModal,
} = ingredient.actions;
