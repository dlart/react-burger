import React, {FC} from 'react';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom'
import {useAppSelector} from '../../hooks/useAppSelector';
import {IConstructorIngredient} from '../../types/IConstructorIngredient';

const IngredientDetails: FC = () => {
  const { id } = useParams();

  const { items } = useAppSelector((state) => state.ingredients);
  
  const ingredient = items.find((ingredient: IConstructorIngredient) => ingredient._id === id);
  
  return (
    <>
      {ingredient && (
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
      )}
    </>
  );
}

export default IngredientDetails;
