import React from 'react';
import {API_BASE_URL} from '../../constants';
import Api from '../../utils/api';
import styles from './App.module.css';
import AppHeader from '../../components/app-header/AppHeader';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';

function App() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState('');

  const onError = () => setError('Ошибка при загрузке данных...');

  React.useEffect(() => {
      const api = new Api({
          baseUrl: API_BASE_URL,
          onError: onError,
      });

      api
          .getIngredients()
          .then((data) => setData(data));
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
