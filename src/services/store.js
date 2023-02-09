import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default configureStore({
  devTools: 'production' !== process.env.NODE_ENV,
  middleware: [thunk],
  reducer,
});
