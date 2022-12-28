import React from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/AppHeader';
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";

function App() {
  return (
    <>
        <AppHeader />
        <main className={[styles.main, 'pl-10', 'pr-10'].join(' ')}>
            <section>
                <BurgerIngredients />
            </section>
            <section className="pl-10">
                <BurgerConstructor />
            </section>
        </main>
    </>
  );
}

export default App;
