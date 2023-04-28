import React, {FC} from 'react';
import styles from './order-feed-page.module.css';

const OrderFeedPage: FC = () => {
  return (
    <main className={`${styles.main} pl-10 pr-10 pt-10`}>
      <div className="text text_type_main-medium pt-2">
        Лента заказов
      </div>
    </main>
  );
}

export default OrderFeedPage;
