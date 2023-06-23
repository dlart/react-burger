import React, {FC} from 'react';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface OrderDetailsProps {
  id: number;
}

const OrderDetails: FC<OrderDetailsProps> = ({id}) => {
  return (
    <>
      <div className="text text_type_digits-large" data-testid="modal-order-number">
        {id}
      </div>
      <div className="mt-8 text text_type_main-medium">
        Идентификатор заказа
      </div>
      <div className="mt-15">
        <CheckMarkIcon type="primary"/>
      </div>
      <div className="mt-15 text text_type_main-default">
        Ваш заказ начали готовить
      </div>
      <div className="mt-2 text text_color_inactive text_type_main-default">
        Дождитесь готовности на орбитальной станции
      </div>
    </>
  );
}

export default OrderDetails;
