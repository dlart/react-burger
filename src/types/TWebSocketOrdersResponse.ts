import {ISuccessResponse} from "./ISuccessResponse";

export type TWebSocketOrdersResponse = {
    orders: [
        {
            _id: string,
            createdAt: string,
            ingredients: string[],
            name: string;
            number: number,
            status: string,
            updatedAt: string,
        }
    ],
    total: number,
    totalToday: number
} & ISuccessResponse;
