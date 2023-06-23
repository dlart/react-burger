import {createAsyncThunk} from '@reduxjs/toolkit';
import { getIngredients as getIngredientsApi } from '../../utils/api';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => (await getIngredientsApi()).data,
);
