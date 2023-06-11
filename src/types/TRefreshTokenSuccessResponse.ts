import {IToken} from "./IToken";
import {ISuccessResponse} from "./ISuccessResponse";

export type TRefreshTokenSuccessResponse = {
    user: {
        email: string | null;
        name: string | null;
    }
}
& ISuccessResponse
& IToken;
