import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  useDrag,
  useDrop,
} from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropTypes from '../../utils/ingredientPropTypes';
import burgerConstructorSlice from '../../services/reducers/burgerConstructor';
import ingredientsSlice from '../../services/reducers/ingredients';

export default function BurgerConstructorIngredient({
  index,
  ingredient,
}) {
  const ref = useRef();

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
        dispatch(moveIngredient({
          newIndex: monitor.getDropResult().index,
          oldIndex: index,
        }));
      }
    },
    item: ingredient,
    type: 'ingredient',
  });

  const handleItemDelete = (
    id,
    index,
  ) => {
    dispatch(decreaseCount(id));
    dispatch(deleteIngredient(index));
  };

  dragItemSource(dropItemTarget(ref));

  return (
    <li ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={() => {handleItemDelete(ingredient._id, index)}}
        isLocked={false}
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
      />
    </li>
  );
};

BurgerConstructorIngredient.propTypes = { ingredient: ingredientPropTypes.isRequired };
