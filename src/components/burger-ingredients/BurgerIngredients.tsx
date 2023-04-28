import React, { useMemo, useRef, useState, FC } from 'react'
import {
  useSelector,
} from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/IngredientCard';
import {
  INGREDIENT_TYPE_BUN,
  INGREDIENT_TYPE_MAIN,
  INGREDIENT_TYPE_SAUCE,
} from '../../constants';
import {IIngredient} from "../../types";

const typesMap: Record<string, string> = {
  [INGREDIENT_TYPE_BUN]: 'Булки',
  [INGREDIENT_TYPE_MAIN]: 'Начинки',
  [INGREDIENT_TYPE_SAUCE]: 'Соусы',
};

const BurgerIngredients:FC = () => {
  const [
    tab,
    setTab,
  ] = useState(INGREDIENT_TYPE_BUN);

  /** @ts-ignore */
  const { items: ingredients } = useSelector(state => state.ingredients);

  const groupIngredients = (ingredients: Array<IIngredient>) => {
    const ingredientsByType: Record<string, Array<IIngredient>> = {};
    for (const type of Object.keys(typesMap)) {
      ingredientsByType[type] = ingredients.filter((ingredient: IIngredient): boolean => type === ingredient.type);
    }
    return ingredientsByType;
  };

  const ingredientsByType = useMemo(
    () => groupIngredients(ingredients),
    [ingredients],
  );

  let refs: Record<string, any> = [];

  const handleTabClick = (type: string) => {
    setTab(type);
    refs[type].scrollIntoView({ behavior: 'smooth' });
  }

  const containerRef = useRef<HTMLElement>(null);

  const handleScroll = () => {
    const current = containerRef.current;
    
    const containerPosition = current ? containerRef
      .current
      .getBoundingClientRect()
      .top : null;

    const categoriesPositions: Record<string, number> = {};

    Object
      .keys(typesMap)
      .map(type => (categoriesPositions[type] = Math.abs(Number(containerPosition) - refs[type].getBoundingClientRect().top)));

    const minCategoryPosition = Math.min(...Object.values(categoriesPositions));

    const currentTab = Object
      .keys(categoriesPositions)
      .find(key => minCategoryPosition === categoriesPositions[key]);

    /** @ts-ignore */
    setTab(currentTab);
  };

  return (
    <>
      <h2 className="pt-10 text text_type_main-large">
        Соберите бургер
      </h2>
      <nav className={`${styles.tabs} mt-5`}>
        {Object.keys(typesMap).map((
          type,
          index,
        ) => {
          return (
            <Tab
              active={type === tab}
              key={index}
              onClick={handleTabClick}
              value={type}
            >
              {typesMap[type]}
            </Tab>
          );
        })}
      </nav>
      <section
        className={`${styles.types} mb-10 mt-10 pl-4 pr-4 pt-6`}
        onScroll={handleScroll}
        ref={containerRef}
      >
        {Object.keys(typesMap).map((
          type,
          index,
        ) => {
          return (
            <section
              className={styles.type}
              key={index}
              ref={(ref) => {refs[type] = ref}}
            >
              <div className={`${styles.typeTitle} text text_type_main-medium`}>
                {typesMap[type]}
              </div>
              <ul className={`${styles.ingredients} mt-6`}>
                {ingredientsByType[type].map((ingredient) => {
                  return (
                    <IngredientCard
                        ingredient={ingredient}
                        key={ingredient._id}
                        onClick={undefined}                    />
                  );
                })}
              </ul>
            </section>
          );
        })}
      </section>
    </>
  );
}

export default BurgerIngredients;
