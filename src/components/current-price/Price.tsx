import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './current-price.module.css'

interface CurrentPriceProps {
  sum: number | undefined;
  size: string
}

const Price = ({
 sum,
 size,
}: CurrentPriceProps): JSX.Element => {
  return (
    <div className={styles.body}>
      <span className={styles.sum}>
        <p className={`text text_type_digits-${size}`}>
          {sum}
        </p>
      </span>
      <CurrencyIcon type="primary"/>
    </div>
  );
};

export default Price;
