import React from 'react';
import styles from './App.module.css';
import AppHeader from '../../components/app-header/AppHeader';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import {BurgerConstructorContext} from '../../services/burgerConstructorContext';
import {api} from '../../services/api';

function App() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
      api
          .getIngredients()
          .then((data) => setData(data))
          .catch(() => setError('Ошибка при загрузке данных...'));
  }, []);

  return (
    <div className={styles.page}>
        <AppHeader />
        <main className={`${styles.main} pl-10 pr-10`}>
            {'' === error
                ? <BurgerConstructorContext.Provider value={data}>
                    <section>
                        <BurgerIngredients />
                    </section>
                    <section>
                        <BurgerConstructor />
                    </section>
                </BurgerConstructorContext.Provider>
                : <>
                    <h1>{error}</h1>
                </>
            }
        </main>
    </div>
  );
}

export default App;
