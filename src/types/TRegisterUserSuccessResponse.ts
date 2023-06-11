import {IToken} from './IToken';
import {IUser} from './IUser';
import {ISuccessResponse} from './ISuccessResponse';

export type TRegisterUserSuccessResponse =
    { user: IUser }
    & IToken
    & ISuccessResponse
;
