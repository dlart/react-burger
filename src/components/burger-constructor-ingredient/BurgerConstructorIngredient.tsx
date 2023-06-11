import React, {FC, useRef} from 'react';
import {DragSourceMonitor, useDrag, useDrop,} from 'react-dnd';
import {ConstructorElement, DragIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import {deleteIngredient, moveIngredient} from '../../services/reducers/burgerConstructor';
import {decreaseCount} from '../../services/reducers/ingredients';
import {IConstructorIngredient} from '../../types/IConstructorIngredient';
import {useAppDispatch} from '../../hooks/useAppDispatch';

interface IBurgerConstructorIngredientProps {
    index: number;
    ingredient: IConstructorIngredient;
}

const BurgerConstructorIngredient: FC<IBurgerConstructorIngredientProps> = ({
    index,
    ingredient,
}) => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement | null>(null);

  const [, dropItemTarget] = useDrop({
      accept: 'ingredient',
      drop: () => ({index}),
  });

  const [, dragItemSource] = useDrag({
      end(
          item,
          monitor: DragSourceMonitor<any, any>,
      ) {
          if (monitor.didDrop()) {
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
      id: string,
      index: number,
  ) => {
      dispatch(decreaseCount(id));
      dispatch(deleteIngredient(index));
  };

  dragItemSource(dropItemTarget(ref));

  return (
      <li ref={ref}>
          <DragIcon type="primary"/>
          <ConstructorElement
              handleClose={() => {
                  handleItemDelete(ingredient._id, index)
              }}
              isLocked={false}
              price={ingredient.price}
              text={ingredient.name}
              thumbnail={ingredient.image}
          />
      </li>
  );
};

export default BurgerConstructorIngredient;
