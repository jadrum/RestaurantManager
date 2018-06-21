export const LOGIN = 'auth/LOGIN';
export const INITDATA = 'auth/INITDATA';
export const LOGOUT = 'auth/LOGOUT';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        uid: action.uid
      };

    case INITDATA:
      return {
        ...state,
        clearance: action.clearance,
        rid: action.restaurant,
        restaurantName: action.restaurantName
      };

    case LOGOUT:
      return {};

    default:
      return state;
  }
};
