import reducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import {OrdersMiddleware} from "../middlewares/orders-middleware";
import {UserOrdersMiddleware} from "../middlewares/user-orders-middleware";

const store = configureStore({
  devTools: 'production' !== process.env.NODE_ENV,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
        OrdersMiddleware,
        UserOrdersMiddleware,
    );
  },
  reducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
