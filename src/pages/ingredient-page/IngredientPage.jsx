import React from 'react';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Modal from '../../components/modal/Modal'
import { useNavigate } from 'react-router-dom';

export default function IngredientPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { items } = useSelector((state) => state.ingredients);

    const ingredient = items.find((ingredient) => ingredient._id === id);

    const handleOnClose = () => {
        navigate(-1);
    };

    return (
        <Modal onClose={handleOnClose}>
        <IngredientDetails ingredient={ingredient} />
        </Modal>
    );
};
