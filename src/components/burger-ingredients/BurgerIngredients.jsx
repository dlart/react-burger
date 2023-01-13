import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Counter,
    CurrencyIcon,
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../utils/ingredientPropTypes';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import IngredientCard from '../ingredient-card/IngredientCard';

const BUN = 'bun';
const MAIN = 'main';
const SAUCE = 'sauce';

const typesMap = {
    [BUN]: 'Булки',
    [MAIN]: 'Начинки',
    [SAUCE]: 'Соусы',
};

function BurgerIngredients({ingredients}) {
    const [
        current,
        setCurrent,
    ] = useState(BUN);

    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const groupIngredients = (ingredients) => {
        const ingredientsByType = {};

        for (const type of Object.keys(typesMap)) {
            ingredientsByType[type] = ingredients.filter((ingredient) => type === ingredient.type);
        }

        return ingredientsByType;
    };

    const ingredientsByType = useMemo(() => groupIngredients(ingredients), [ingredients]);

    let refs = [];

    const handleTabClick = (type) => {
        setCurrent(type);

        refs[type].scrollIntoView({behavior: 'smooth'});
    }

    const modal = <IngredientDetails
        ingredient={selected}
        onClose={() => setOpen(false)}
    />;

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
                            active={current === type}
                            key={index}
                            onClick={handleTabClick}
                            value={type}
                        >
                            {typesMap[type]}
                        </Tab>
                    );
                })}
            </nav>
            <section className={`${styles.types} mb-10 mt-10 pl-4 pr-4 pt-6`}>
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
                                {ingredientsByType[type].map((
                                    ingredient,
                                    index,
                                ) => {
                                    return (
                                        <IngredientCard
                                            ingredient={ingredient}
                                            key={index}
                                            onClick={() => {
                                                setOpen(true);
                                                setSelected(ingredient);
                                            }}
                                        />
                                    );
                                })}
                            </ul>
                        </section>
                    );
                })}
            </section>
            {open && modal}
        </>
    );
}

BurgerIngredients.propTypes = {ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired};

export default BurgerIngredients;
