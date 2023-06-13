import { IIngredient } from './IIngredient';
import { ISuccessResponse } from './ISuccessResponse';

export type TIngredientsSuccessResponse = {
    data: IIngredient[];
} & ISuccessResponse;
