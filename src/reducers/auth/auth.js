export const LOGIN = 'auth/LOGIN';
export const LOGOUT = 'auth/LOGOUT';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        uid: action.uid
      };

    case LOGOUT:
      return {};

    default:
      return state;
  }
};
