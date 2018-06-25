export const FETCH_APPETIZERS = 'appetizers/FETCH';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPETIZERS:
      return {
        ...state,
        appetizers: action.payload
      };

    default:
      return state;
  }
};
