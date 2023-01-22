export default class Api {
    constructor({baseUrl, onError}) {
        this.baseUrl = baseUrl;
        this.onError = onError;

        this.getIngredients = this.getIngredients.bind(this);
    }

    async getIngredients() {
        return fetch(this.baseUrl + '/api/ingredients')
            .then((response) => response.json())
            .then((result) => result.data)
            .catch((error) => this.onError(error));
    }

    async createOrder(ingredientsIds) {
        return fetch(this.baseUrl + '/api/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredients: ingredientsIds}),
        })
            .then((response) => response.json())
            .then((result) => result)
            .catch((error) => this.onError(error));
    }
};
