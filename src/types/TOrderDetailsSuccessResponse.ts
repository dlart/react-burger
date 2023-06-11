import {IOrder} from './IOrder';
import {ISuccessResponse} from './ISuccessResponse';

export type TOrderDetailsSuccessResponse = {
    orders: IOrder[];
} & ISuccessResponse;
