export const API_BASE: string = 'https://norma.nomoreparties.space';

export const API = {
  AUTH: {
    LOGIN: API_BASE + '/api/auth/login',
    LOGOUT: API_BASE + '/api/auth/logout',
    REGISTER: API_BASE + '/api/auth/register',
    TOKEN: API_BASE + '/api/auth/token',
    USER: API_BASE + '/api/auth/user',
  },
  INGREDIENTS: API_BASE + '/api/ingredients',
  ORDERS: API_BASE + '/api/orders',
  PASSWORD_RESET: {
    REQUEST: API_BASE + '/api/password-reset',
    RESET: API_BASE + '/api/password-reset/reset',
  },
};

export const INGREDIENT: { [key: string]: string; } = {
  BUN: 'bun',
  MAIN: 'main',
  SAUCE: 'sauce',
};

export const ROUTE: { [key: string]: string; } = {
  FORGOT_PASSWORD: '/forgot-password',
  INDEX: '/',
  INGREDIENT: '/ingredients/:id',
  LOGIN: '/login',
  ORDER_FEED: '/feed',
  ORDER_FEED_DETAIL: '/feed/:id',
  PROFILE: '/profile',
  USER_ORDERS: '/profile/orders',
  USER_ORDER_DETAIL: '/profile/orders/:orderNumber',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
};

export const WEB_SOCKET_BASE: { [key: string]: string; } = {
  ORDERS: 'wss://norma.nomoreparties.space/orders/all',
  USER_ORDERS: 'wss://norma.nomoreparties.space/orders',
};
