import React from 'react';
import styles from './App.module.css';
import AppHeader from '../../components/app-header/AppHeader';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import ingredients from '../../utils/ingredients';

function App() {
  return (
    <>
        <AppHeader />
        <main className={`${styles.main} pl-10 pr-10`}>
            <section>
                <BurgerIngredients ingredients={ingredients} />
            </section>
            <section>
                <BurgerConstructor ingredients={ingredients} />
            </section>
        </main>
    </>
  );
}

export default App;
