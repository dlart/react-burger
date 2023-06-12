import React, {useEffect} from 'react';
import styles from './order-feed-page.module.css';
import OrderList from '../../components/order-list/OrderList';
import Statistics from '../../components/statistics/Statistics';
import {ordersConnect, ordersDisconnect} from '../../services/actions/orders';
import {WEB_SOCKET_BASE} from '../../constants';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';

const OrderFeedPage = () => {
    const dispatch = useAppDispatch();

    const ordersFeedData = useAppSelector(state => state.orders.orders);

    const executedRef = React.useRef(false);

    useEffect(() => {
        if (!executedRef.current) {
            executedRef.current = true;
            dispatch(ordersConnect(WEB_SOCKET_BASE.ORDERS));
        }

        return () => {
            dispatch(ordersDisconnect());
        };
    }, [dispatch])

    return (
      <div className={'container'}>
        <section>
          <h1 className='text text_type_main-large mb-5'>
            Лента заказов
          </h1>
          <div className={styles.content}>
            <div className={styles.column}>
              <OrderList ordersFeedData={ordersFeedData}/>
            </div>
            <div className={styles.column}>
              <Statistics ordersFeedData={ordersFeedData}/>
            </div>
          </div>
        </section>
      </div>
    );
};

export default OrderFeedPage;
