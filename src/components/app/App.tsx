import React from 'react';
import styles from './App.module.css';
import AppHeader from '../../components/app-header/AppHeader';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import Modal from '../modal/Modal';
import ModalOverlay from "../modal-overlay/ModalOverlay";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/OrderDetails";
import IngredientDetails from "../ingredient-details/IngredientDetails";

const API_BASE_URL = 'https://norma.nomoreparties.space';

function App() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
      fetch(API_BASE_URL + '/api/ingredients')
          .then((response) => response.json())
          .then((response) => setData(response.data))
          .catch(() => {
              setError('Ошибка при загрузке данных...')
          });
  }, []);

  return (
    <>
        <AppHeader />
        <main className={`${styles.main} pl-10 pr-10`}>
            {'' === error
                ? <>
                    <section>
                        <BurgerIngredients ingredients={data} />
                    </section>
                    <section>
                        <BurgerConstructor ingredients={data} />
                    </section>
                </>
                : <>
                    <h1>{error}</h1>
                </>
            }
        </main>
    </>
  );
}

export default App;
