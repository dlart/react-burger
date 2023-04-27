import React, { useRef, FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  useDrag,
  useDrop,
} from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorSlice from '../../services/reducers/burgerConstructor';
import ingredientsSlice from '../../services/reducers/ingredients';
import {IIngredient} from '../../types';

interface IBurgerConstructorIngredientProps {
    index: number;
    ingredient: IIngredient;
}

const BurgerConstructorIngredient: FC<IBurgerConstructorIngredientProps> = ({
  index,
  ingredient,
}) => {
  const ref = useRef<HTMLLIElement|null>(null);

  const dispatch = useDispatch();

  const {
    deleteIngredient,
    moveIngredient,
  } = burgerConstructorSlice.actions;

  const { decreaseCount } = ingredientsSlice.actions;

  const [, dropItemTarget] = useDrop({
    accept: 'ingredient',
    drop: () => ({index}),
  });

  const [, dragItemSource] = useDrag({
    end(
      item,
      monitor,
    ) {
      if(monitor.didDrop()) {
        /** @ts-ignore */
        dispatch(moveIngredient({
          /** @ts-ignore */
          newIndex: monitor.getDropResult().index,
          oldIndex: index,
        }));
      }
    },
    item: ingredient,
    type: 'ingredient',
  });

  const handleItemDelete = (
    id: number,
    index: number,
  ) => {
    /** @ts-ignore */
    dispatch(decreaseCount(id));
    /** @ts-ignore */
    dispatch(deleteIngredient(index));
  };

  dragItemSource(dropItemTarget(ref));

  return (
    <li ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        /** @ts-ignore */
        handleClose={() => {handleItemDelete(ingredient._id, index)}}
        isLocked={false}
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
      />
    </li>
  );
};

export default BurgerConstructorIngredient;
