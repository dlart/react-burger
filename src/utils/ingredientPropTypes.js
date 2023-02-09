import PropTypes from 'prop-types';
import {
  INGREDIENT_TYPE_BUN,
  INGREDIENT_TYPE_MAIN,
  INGREDIENT_TYPE_SAUCE,
} from '../constants';

export default PropTypes.shape({
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.oneOf([
    INGREDIENT_TYPE_BUN,
    INGREDIENT_TYPE_MAIN,
    INGREDIENT_TYPE_SAUCE,
  ]),
});
