import {ISuccessResponse} from './ISuccessResponse';
import {IOrdersWebSocketItem} from './IOrdersWebSocketItem';

export type TOrdersWebSocketResponse = {
    orders: IOrdersWebSocketItem[],
    total: number,
    totalToday: number
} & ISuccessResponse;
