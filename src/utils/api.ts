export default class Api {
  private readonly baseUrl: string;

  constructor (baseUrl: string) {
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

  _checkResponse <T>(response: Response): Promise<T> {
    return response.ok
      ? response.json()
      : response
        .json()
        .then((error) => Promise.reject(error));
  }

  _request <T>(
    url: string,
    options: RequestInit,
  ): Promise<T> {
    return fetch(
      url,
      options,
    )
    .then(this._checkResponse<T>);
  }
  
  async _requestWithToken <T>(
    url: string,
    options: RequestInit,
  ): Promise<T> {
    try {
      const response = await fetch(url, options);
      return await this._checkResponse(response);
    } catch (error: any) {
      if (error.message === "jwt expired") {
        const refreshData = await this.refreshToken<{success: boolean, accessToken: string, refreshToken: string}>(localStorage.getItem('refreshToken') ?? '');
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem('accessToken', refreshData.accessToken);
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        if (undefined === options.headers) {
            options.headers = {};
        }
        options.headers = {
            ...options.headers,
            ...{Authorization: refreshData.accessToken}
        };
        const res = await fetch(url, options); //повторяем запрос
        return await this._checkResponse(res);
      } else {
        return Promise.reject(error);
      }
    }
  }

  async createOrder (
    ingredientsIds: number[],
    token: string,
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
      ._request<{data: object}>(`${this.baseUrl}/api/ingredients`, {})
      .then((result) => result.data);
  }

  async getUser(token: string): Promise<object> {
    return this
      ._requestWithToken<{user: object}>(
        `${this.baseUrl}/api/auth/user`,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        },
      )
      .then((response) => response.user);
  }

  async login ({
    email,
    password,
  }: {[name: string]: string}) {
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

  async logout (refreshToken: string): Promise<Response> {
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
  }: {password: string, token: string}): Promise<Response> {
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

  async passwordResetRequest (email: string): Promise<Response> {
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
  
  async refreshToken <T>(refreshToken: string): Promise<T> {
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
  }: {[name: string]: string}) {
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
    token: string,
    {
      email,
      name,
      password,
    }: {[name: string]: string},
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
