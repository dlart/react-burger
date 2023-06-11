import React from 'react';
import styles from './page-feed-detail.module.css';
import Order from '../../components/about-order/Order';

const PageFeedDetail = (): JSX.Element => {
  return (
    <div className="container">
      <div className={styles.body}>
        <Order />
      </div>
    </div>
  );
};

export default PageFeedDetail;
