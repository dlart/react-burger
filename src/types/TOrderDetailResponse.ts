import {ISuccessResponse} from "./ISuccessResponse";
import {IOrder} from "./IOrder";

export type TOrderDetailResponse = {
    success: boolean;
    orders: IOrder[],
} & ISuccessResponse;
