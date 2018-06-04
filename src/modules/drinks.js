export const ADD_DRINK = 'drink/ADD';
export const REMOVE_DRINK = 'drink/REMOVE';
export const UPDATE_DRINK = 'drink/UPDATE';

const initialState = {
  drinks: {
    billy: { name: 'billy', price: '3.00', desc: 'yo' }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DRINK:
      return {
        ...state,
        drinks: {
          ...state.drinks,
          [action.name]: {
            name: action.name,
            price: action.price,
            desc: action.desc
          }
        }
      };

    case REMOVE_DRINK:
      // remove = bject want to remove
      // newDrinks = everything else
      const { [action.name]: remove, ...newDrinks } = state.drinks;
      return {
        ...state,
        drinks: {
          ...newDrinks
        }
      };

    case UPDATE_DRINK:
      if (action.oldName === action.newDrink.name) {
        // update the drink, with the new data
        return {
          ...state,
          drinks: {
            ...state.drinks,
            [action.oldName]: action.newDrink
          }
        };
      } else {
        // remove the old drink, and replace with new drink
        // since primary key has changed
        const { [action.oldName]: remove, ...newDrinks } = state.drinks;
        return {
          ...state,
          drinks: {
            ...newDrinks,
            [action.newDrink.name]: action.newDrink
          }
        };
      }

    default:
      return state;
  }
};

export const addDrink = data => {
  return dispatch => {
    dispatch({
      type: ADD_DRINK,
      name: data.name,
      price: data.price,
      desc: data.desc
    });
  };
};

export const removeDrink = data => {
  return dispatch => {
    dispatch({
      type: REMOVE_DRINK,
      name: data
    });
  };
};

export const updateDrink = data => {
  return dispatch => {
    dispatch({
      type: UPDATE_DRINK,
      oldName: data.oldName,
      newDrink: data.newDrink
    });
  };
};
