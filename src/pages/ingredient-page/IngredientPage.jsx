import React from 'react';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './ingredient-page.module.css';

export default function IngredientPage() {
    const { id } = useParams();

    const { items } = useSelector((state) => state.ingredients);

    const ingredient = items.find((ingredient) => ingredient._id === id);

    return (
        <div className={styles.container}>
            <IngredientDetails ingredient={ingredient} />
        </div>
    );
};
