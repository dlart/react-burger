import React from 'react';
import styles from './ingredient-details.module.css';
import ingredientPropTypes from '../../utils/ingredientPropTypes';

export default function IngredientDetails({ingredient}) {
  return (
    <>
      <div>
        <img
          src={ingredient.image_large}
          alt={ingredient.name}
        />
      </div>
      <div className="mt-4 text text_type_main-medium">
        {ingredient.name}
      </div>
      <ul className={`${styles.composition} mt-8`}>
        <li>
          <div>
            <div className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </div>
            <div className="mt-2 text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </div>
          </div>
        </li>
        <li>
          <div>
            <div className="text text_type_main-default text_color_inactive">
              Белки, г
            </div>
            <div className="mt-2 text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </div>
          </div>
        </li>
        <li>
          <div>
            <div className="text text_type_main-default text_color_inactive">
              Жиры, г
            </div>
            <div className="mt-2 text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </div>
          </div>
        </li>
        <li>
          <div>
            <div className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </div>
            <div className="mt-2 text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = { ingredient: ingredientPropTypes };
