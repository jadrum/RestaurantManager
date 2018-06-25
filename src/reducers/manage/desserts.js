export const FETCH_DESSERTS = 'desserts/FETCH';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DESSERTS:
      return {
        ...state,
        desserts: action.payload
      };

    default:
      return state;
  }
};
