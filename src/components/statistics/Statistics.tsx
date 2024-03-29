import React, {useMemo} from 'react';
import styles from './statistics.module.css';
import {TWebSocketOrdersResponse} from '../../types/TWebSocketOrdersResponse';

const Statistics = ({ordersFeedData}: { ordersFeedData: TWebSocketOrdersResponse | null }): JSX.Element => {
  const closedOrders: number[] =  [];

  const processedOrders: number[] = [];

  useMemo(() => {
    // eslint-disable-next-line
    return ordersFeedData?.orders.filter((order) => {
      if (order.status === 'done') {
        closedOrders.push(order.number)
      } else {
        processedOrders.push(order.number)
      }
    })
  }, [
    ordersFeedData,
    processedOrders,
    closedOrders,
  ]);

  return (
    <div className={styles.body}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <div className={styles.columnTitle}>
            <p className={'text text_type_main-medium'}>
              Готовы:
            </p>
          </div>
          <div className={`${styles.columnNumbers} ${styles.text}`}>
            {closedOrders.slice(0, 20).map(number => (
              <p key={number} className={'text text_type_main-medium'}>
                {number}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.columnTitle}>
            <p className={'text text_type_main-medium'}>
              В работе:
            </p>
          </div>
          <div className={styles.columnNumbers}>
            {processedOrders.slice(0, 20).map(number => (
              <p key={number} className={'text text_type_main-medium'}>
                {number}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.text_block}>
        <div className={styles.title}>
          <p className={'text text_type_main-medium'}>
            Выполнено за все время:
          </p>
        </div>
        <div className={styles.total}>
          <p className="text text_type_digits-large">
            {ordersFeedData?.total}
          </p>
        </div>
      </div>
      <div className={styles.text_block}>
        <div className={styles.title}>
          <p className={'text text_type_main-medium'}>
            Выполнено за сегодня:
          </p>
        </div>
        <div className={styles.total}>
          <p className="text text_type_digits-large">
            {ordersFeedData?.totalToday}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
