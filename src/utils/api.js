export default class Api {
  constructor (baseUrl) {
    this.baseUrl = baseUrl

    this._checkResponse = this._checkResponse.bind(this);
    this._request = this._request.bind(this);
    this._requestWithToken = this._requestWithToken.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.getUser = this.getUser.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.passwordReset = this.passwordReset.bind(this);
    this.passwordResetRequest = this.passwordResetRequest.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.register = this.register.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  _checkResponse (response) {
    return response.ok
      ? response.json()
      : response
        .json()
        .then((error) => Promise.reject(error));
  }

  _request (
    url,
    options,
  ) {
    return fetch(
      url,
      options,
    )
    .then(this._checkResponse);
  }
  
  async _requestWithToken (
    url,
    options
  ) {
    try {
      const response = await fetch(url, options);
      return await this._checkResponse(response);
    } catch (error) {
      if (error.message === "jwt expired") {
        const refreshData = await this.refreshToken(localStorage.getItem('refreshToken')); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem('accessToken', refreshData.accessToken);
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        options.headers.Authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await this._checkResponse(res);
      } else {
        return Promise.reject(error);
      }
    }
  }

  async createOrder (
    ingredientsIds,
    token,
  ) {
    return this
      ._requestWithToken(
        `${this.baseUrl}/api/orders`,
        {
          body: JSON.stringify({ ingredients: ingredientsIds }),
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          method: 'POST',
        },
      )
      .then((result) => result);
  }

  async getIngredients () {
    return this
      ._request(`${this.baseUrl}/api/ingredients`)
      .then((result) => result.data);
  }

  async getUser (token) {
    return this
      ._requestWithToken(
        `${this.baseUrl}/api/auth/user`,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        },
      )
      .then(response => response.user);
  }

  async login ({
    email,
    password,
  }) {
    return this
      ._request(
        `${this.baseUrl}/api/auth/login`,
        {
          body: JSON.stringify({
            email,
            password,
          }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        },
      );
  }

  async logout (refreshToken) {
    return this
      ._request(
        `${this.baseUrl}/api/auth/logout`,
        {
          body: JSON.stringify({ token: refreshToken }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        },
      );
  }

  async passwordReset ({
    password,
    token,
  }) {
    return this
      ._request(
        `${this.baseUrl}/api/password-reset/reset`,
        {
          body: JSON.stringify({
            password,
            token,
          }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        },
      );
  }

  async passwordResetRequest (email) {
    return this
      ._request(
        `${this.baseUrl}/api/password-reset`,
        {
          body: JSON.stringify({ email: email }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        },
      );
  }
  
  async refreshToken (refreshToken) {
    return this
      ._request(`${this.baseUrl}/api/auth/token`,
        {
          body: JSON.stringify({ token: refreshToken }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        },
      );
  }

  async register ({
    email,
    name,
    password,
  }) {
    return this
      ._request(`${this.baseUrl}/api/auth/register`,
        {
          body: JSON.stringify({
            email,
            name,
            password,
          }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        },
      );
  }

  async updateUser (
    token,
    {
      email,
      name,
      password,
    },
  ) {
    return this
      ._requestWithToken(
        `${this.baseUrl}/api/auth/user`,
        {
          body: JSON.stringify({
            email,
            name,
            password,
          }),
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        },
      );
  }
};
