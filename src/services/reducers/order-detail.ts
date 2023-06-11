import {createSlice} from "@reduxjs/toolkit";
import {TOrderDetailResponse} from "../../types/TOrderDetailResponse";
import {getOrderDetails} from "../actions/orderDetail";

interface IOrderDetailDataState {
    order: TOrderDetailResponse | null,
    loading: boolean,
    error: string | null | undefined,
}

const initialState: IOrderDetailDataState = {
    order: null,
    loading: false,
    error: null,
}

const orderDetail = createSlice({
    name: 'order-detail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrderDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getOrderDetails.fulfilled, (state, action) => {
            state.order = action.payload;
            state.loading = false;
        });
        builder.addCase(getOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default orderDetail.reducer;