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
};
