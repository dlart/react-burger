import burgerConstructor from './burgerConstructor';
import ingredient from './ingredient';
import ingredients from './ingredients';
import order from './order';
import orders from './orders';
import user from './user';
import userOrders from './userOrders';
import orderDetail from './order-detail';
import { combineReducers } from 'redux';

export default combineReducers({
  burgerConstructor,
  ingredient,
  ingredients,
  order,
  orders,
  userOrders,
  orderDetail,
  user,
});
