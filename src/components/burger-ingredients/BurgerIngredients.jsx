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

    const handleClick = (type) => {
        setCurrent(type);

        refs[type].scrollIntoView({behavior: 'smooth'});
    }

    const modal = <IngredientDetails
        ingredient={selected}
        onClose={() => setOpen(false)}
    />;

    const handleKeyDown = (e) => {
        if ('Escape' !== e.code) return;
        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [])

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
                            onClick={handleClick}
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
                                        <li
                                            className={styles.ingredient}
                                            key={index}
                                            onClick={() => {
                                                setSelected(ingredient);
                                                setOpen(true);
                                            }}
                                        >
                                            <Counter count={1} />
                                            <img
                                                alt={ingredient.name}
                                                className="ml-4 mr-4"
                                                src={ingredient.image}
                                            />
                                            <div className={`${styles.price} mt-1`}>
                                                <span className="text text_type_digits-default">
                                                    {ingredient.price}
                                                </span>
                                                <CurrencyIcon type="primary"/>
                                            </div>
                                            <div className={`${styles.name} mt-1 text text_type_main-default`}>
                                                {ingredient.name}
                                            </div>
                                        </li>
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

BurgerIngredients.propTypes = {ingredients: PropTypes.arrayOf(ingredientPropTypes)};

export default BurgerIngredients;
