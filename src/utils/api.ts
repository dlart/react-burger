import {API} from '../constants';
import {IRegisterRequest} from '../types/IRegisterRequest';
import {IResetPasswordResetRequest} from '../types/IResetPasswordResetRequest';
import {IUpdateUserRequest} from '../types/IUpdateUserRequest';
import {TCreateOrderSuccessResponse} from '../types/TCreateOrderSuccessResponse';
import {TIngredientsSuccessResponse} from '../types/TIngredientsSuccessResponse';
import {TLoginRequest} from '../types/TLoginRequest';
import {TLoginSuccessResponse} from '../types/TLoginSuccessResponse';
import {TLogoutUserSuccessResponse} from '../types/TLogoutUserSuccessResponse';
import {TOrderDetailsSuccessResponse} from '../types/TOrderDetailsSuccessResponse';
import {TRefreshTokenSuccessResponse} from '../types/TRefreshTokenSuccessResponse';
import {TRegisterUserSuccessResponse} from '../types/TRegisterUserSuccessResponse';
import {TResetPasswordResetSuccessResponse} from '../types/TResetPasswordResetSuccessResponse';
import {TResetPasswordSuccessResponse} from '../types/TResetPasswordSuccessResponse';
import {TUpdateUserSuccessResponse} from '../types/TUpdateUserSuccessResponse';

export const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok
        ? res.json() as Promise<T>
        : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    return (
        request<TRefreshTokenSuccessResponse>(API.AUTH.TOKEN, {
            body: JSON.stringify({
                token: refreshToken ?? '',
            }),
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
        })
    )
};

export const fetchWithRefresh = async (
    url: string,
    options: RequestInit,
) => {
    try {
        return await request(
            url,
            options,
        );
    } catch (error: unknown) {
        if ('jwt expired' === (error as Error).message) {
            const refreshTokenResponse = await refreshToken();

            if (!refreshTokenResponse.success) {
                return Promise.reject(refreshTokenResponse);
            }

            localStorage.setItem(
                'accessToken',
                refreshTokenResponse.accessToken,
            );

            localStorage.setItem(
                'refreshToken',
                refreshTokenResponse.refreshToken,
            );

            const headers = new Headers(options.headers);

            headers.set(
                'Authorization',
                refreshTokenResponse.accessToken,
            );

            return await request(
                url,
                {
                    ...options,
                    headers,
                },
            );
        } else {
            return Promise.reject(error);
        }
    }
};

export const request = <T>(
    url: string,
    options?: RequestInit,
): Promise<T> => {
    return fetch(
        url,
        options
    )
    .then(checkResponse<T>);
}

export const getIngredients = async (): Promise<TIngredientsSuccessResponse> => {
    return await request(API.INGREDIENTS)
}

export const registerUser = async (data: IRegisterRequest) => {
    return (
        await request<TRegisterUserSuccessResponse>(
            API.AUTH.REGISTER,
            {
                body: JSON.stringify({
                    email: data.email,
                    name: data.name,
                    password: data.password,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            },
        )
            .then((data: TRegisterUserSuccessResponse) => {
                localStorage.setItem(
                    'accessToken',
                    data.accessToken,
                );

                localStorage.setItem(
                    'refreshToken',
                    data.refreshToken,
                );

                return data;
            })
    );
};

export const loginUser = async (data: TLoginRequest) => {
    return (
        await request<TLoginSuccessResponse>(
            API.AUTH.LOGIN,
            {
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            }
        )
            .then((data: TLoginSuccessResponse) => {
                localStorage.setItem(
                    'accessToken',
                    data.accessToken,
                );

                localStorage.setItem(
                    'refreshToken',
                    data.refreshToken,
                );

                return data;
            })
    )
}

export const resetPasswordRequest = async (email: string) => {
    return (
        await request<TResetPasswordSuccessResponse>(
            API.PASSWORD_RESET.REQUEST,
            {
                body: JSON.stringify({email: email}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            },
        )
    )
}

export const resetPasswordReset = async (data: IResetPasswordResetRequest) => {
    return (
        await request<TResetPasswordResetSuccessResponse>(
            API.PASSWORD_RESET.RESET,
            {
                body: JSON.stringify({
                    password: data.password,
                    token: data.token,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            },
        )
    );
}

export const logoutUser = async () => {
    return (
        await request<TLogoutUserSuccessResponse>(
            API.AUTH.LOGOUT,
            {
                body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            },
        ).then((response: TLogoutUserSuccessResponse) => {
            if (response
                && response.success
            ) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        })
    )
};

export const updateUser = async (data: IUpdateUserRequest) => {
    const token = localStorage.getItem('accessToken');

    return (
        await request<TUpdateUserSuccessResponse>(
            API.AUTH.USER,
            {
                body: JSON.stringify({
                    email: data.email,
                    name: data.name,
                    password: data.password,
                }),
                headers: {
                    'Authorization': token ?? '',
                    'Content-Type': 'application/json',
                },
                method: 'PATCH',
            },
        )
    )
};

export const createOrder = async (ingredientsIds: string[]) => {
    const accessToken = localStorage.getItem('accessToken');

    return (
        await request<TCreateOrderSuccessResponse>(
            API.ORDERS,
            {
                body: JSON.stringify({ingredients: ingredientsIds}),
                headers: {
                    'Accept': 'application/json',
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            },
        )
    );
};

export const getOrderDetails = async (number: string) => {
    return (
        await request<TOrderDetailsSuccessResponse>(
            API.ORDERS + `/${number}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'GET'
            },
        )
    )
}
