import { combineReducers } from 'redux';
import burgerConstructor from './burgerConstructor';
import ingredient from './ingredient';
import ingredients from './ingredients';
import register from './register';
import login from './login';
import order from './order';
import user from './user';

export default combineReducers({
  burgerConstructor: burgerConstructor.reducer,
  ingredient: ingredient.reducer,
  ingredients: ingredients.reducer,
  register: register.reducer,
  login: login.reducer,
  user: user.reducer,
  order: order.reducer,
});
