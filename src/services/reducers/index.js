import { combineReducers } from 'redux';
import burgerConstructor from './burgerConstructor';
import ingredient from './ingredient';
import ingredients from './ingredients';
import order from './order';

export default combineReducers({
  burgerConstructor: burgerConstructor.reducer,
  ingredient: ingredient.reducer,
  ingredients: ingredients.reducer,
  order: order.reducer,
});
