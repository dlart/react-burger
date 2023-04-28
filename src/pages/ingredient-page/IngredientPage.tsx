import React, {FC} from 'react';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import styles from './ingredient-page.module.css';

const IngredientPage: FC = () => {
    return (
        <div className={styles.container}>
            <IngredientDetails />
        </div>
    );
};

export default IngredientPage;
