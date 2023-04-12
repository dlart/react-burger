export default class Api {
    constructor({baseUrl}) {
        this.baseUrl = baseUrl;

        this._checkResponse = this._checkResponse.bind(this);
        this._request = this._request.bind(this);
        this._refreshToken = this._refreshToken.bind(this);
        this._fetchWithRefresh = this._fetchWithRefresh.bind(this);
        this.getIngredients = this.getIngredients.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Ошибка ${response.status}`);
    }

    _refreshToken() {
        return fetch(`${this.baseUrl}/auth/token`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        }).then((res) => this._checkResponse(res));
    }

    async _fetchWithRefresh(url, options) {
        return fetch(url, options).then((res) => this._checkResponse(res))
        .catch((res) => {
            return res.json()
            .then((err) => {
                if (err?.message === 'jwt expired') {
                    return this._refreshToken()
                    .then(res => {
                        localStorage.setItem('refreshToken', res.refreshToken)
                        const authToken = res.accessToken.split('Bearer ')[1];
                        localStorage.setItem('token', res.authToken)
                        options.headers.Authorization = res.accessToken
                        return fetch(url, options).then((res) => this._checkResponse(res))
                    })
                } else {
                    localStorage.removeItem('token')
                    localStorage.removeItem('refreshToken');
                    // eslint-disable-next-line
                    location.reload()
                    return Promise.reject(err)
                }
            })
        })
    }

    _request(url, options) {
        return this._fetchWithRefresh(url, options);
    }

    async getIngredients() {
        return this
            ._request(this.baseUrl + '/api/ingredients')
            .then((result) => result.data);
    }

    async createOrder(ingredientsIds) {
        return this
            ._request(this.baseUrl + '/api/orders', {
                body: JSON.stringify({ingredients: ingredientsIds}),
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
            })
            .then((result) => result);
    }

    async passwordResetRequest(email) {
        return this
            ._request(this.baseUrl + '/api/password-reset', {
                body: JSON.stringify({email: email}),
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
            });
    }

    async passwordReset({
      password,
      token,
    }) {
        return this
        ._request(this.baseUrl + '/api/password-reset/reset', {
            body: JSON.stringify({
                password,
                token,
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        });
    }

    async register({
        email,
        password,
        name,
    }) {
        return this
        ._request(this.baseUrl + '/api/auth/register', {
            body: JSON.stringify({
                email,
                password,
                name,
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        });
    }

    async login({
        email,
        password,
    }) {
        return this
            ._request(this.baseUrl + '/api/auth/login', {
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
            });
    }

    async logout(refreshToken) {
        return this
        ._request(this.baseUrl + '/api/auth/logout', {
            body: JSON.stringify({
                token: refreshToken
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        });
    }

    async getUser(token) {
        return this
        ._request(this.baseUrl + '/api/auth/user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            method: 'GET',
        })
        .then(response => response.user);
    }

    async updateUser(token, user) {
        return this
        ._request(this.baseUrl + '/api/auth/user', {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            method: 'PATCH',
        });
    }
};
