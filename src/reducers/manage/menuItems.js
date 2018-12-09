import { FETCH_ITEMS, FETCH_MENU, FETCH_LABELS } from '../../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        items: action.payload
      };

    case FETCH_LABELS:
      return {
        ...state,
        labels: action.payload
      };

    case FETCH_MENU:
      return {
        ...state,
        menu: action.payload
      };

    default:
      return state;
  }
};
