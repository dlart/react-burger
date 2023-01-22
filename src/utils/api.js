export default class Api {
    constructor({baseUrl}) {
        this.baseUrl = baseUrl;

        this._checkResponse = this._checkResponse.bind(this);
        this._request = this._request.bind(this);
        this.getIngredients = this.getIngredients.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }

    _checkResponse(response) {
        if (response.ok || response.success) {
            return response.json();
        }

        return Promise.reject(`Ошибка ${response.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    async getIngredients() {
        return this._request(this.baseUrl + '/api/ingredients')
            .then((result) => result.data);
    }

    async createOrder(ingredientsIds) {
        return this._request(this.baseUrl + '/api/orders', {
            body: JSON.stringify({ingredients: ingredientsIds}),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        })
        .then((result) => result);
    }
};
