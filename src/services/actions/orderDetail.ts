import {createAsyncThunk} from '@reduxjs/toolkit';
import {getOrderDetails as getOrderDetailsApi} from '../../utils/api';

export const getOrderDetails = createAsyncThunk(
    'order/getOrderDetail',
    getOrderDetailsApi,
);
