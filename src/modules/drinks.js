export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED';
export const INCREMENT = 'counter/INCREMENT';
export const ADD_DRINK = 'drink/ADD';
export const REMOVE_DRINK = 'drink/REMOVE';

const initialState = {
  drinks: {
    bob: { name: 'bob', desc: 'yo' }
  },
  count: 0,
  isIncrementing: false,
  isDecrementing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DRINK:
      return {
        ...state,
        drinks: {
          ...state.drinks,
          [action.name]: { name: action.name, desc: action.desc }
        }
      };

    case REMOVE_DRINK:
      return {
        ...state
      };

    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      };

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      };

    default:
      return state;
  }
};

export const addDrink = data => {
  return dispatch => {
    dispatch({
      type: ADD_DRINK,
      name: data.name,
      desc: data.desc
    });
  };
};

export const removeDrink = name => {
  return dispatch => {
    dispatch({
      type: REMOVE_DRINK,
      id: name
    });
  };
};

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    });

    dispatch({
      type: INCREMENT
    });
  };
};

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      });
    }, 3000);
  };
};
