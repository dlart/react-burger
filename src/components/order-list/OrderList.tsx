import React from 'react';
import styles from './order-list.module.css';
import OrderListCard from '../order-list-card/OrderListCard';
import {TWebSocketOrdersResponse} from '../../types/TWebSocketOrdersResponse';

const OrderList = ({data}: { data: TWebSocketOrdersResponse | null }): JSX.Element => {
  let sorted;

  if (data?.orders !== undefined) {
    sorted = [...data?.orders].sort((
      a,
      b,
    ) => {
      const dateA = Date.parse(a.createdAt);
      const dateB = Date.parse(b.createdAt);

      return dateB - dateA;
    });
  }

  return (
    <div className={styles.body}>
      {sorted?.map((feedCard) => (
        <OrderListCard
          key={feedCard.number}
          order={feedCard}
        />
      ))}
    </div>
  );
};

export default OrderList;
