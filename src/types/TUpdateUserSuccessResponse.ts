import {ISuccessResponse} from './ISuccessResponse';

export type TUpdateUserSuccessResponse = {
    user: {
        email: string | null;
        name: string | null;
    };
} & ISuccessResponse;
