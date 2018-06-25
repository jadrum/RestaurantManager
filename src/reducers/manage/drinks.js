export const FETCH_DRINKS = 'drinks/FETCH';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRINKS:
      return {
        ...state,
        drinks: action.payload
      };

    default:
      return state;
  }
};
