import { api } from '../api';
import ingredientsSlice from '../reducers/ingredients';

export const getIngredients = () => {
    const {
        request,
        requestFailed,
        requestSuccess,
    } = ingredientsSlice.actions;

    return dispatch => {
        dispatch(request());

        api
            .getIngredients()
            .then(ingredients => dispatch(requestSuccess(ingredients)))
            .catch(() => dispatch(requestFailed()));
    }
}
