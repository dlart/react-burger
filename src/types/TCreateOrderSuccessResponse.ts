import { ISuccessResponse } from './ISuccessResponse';

export type TCreateOrderSuccessResponse = {
    name: string;
    order: { number: number };
} & ISuccessResponse;
