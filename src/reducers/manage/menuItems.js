export const FETCH_ITEMS = 'items/FETCH';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
};
