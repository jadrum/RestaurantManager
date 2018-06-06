import { drinks } from '../firebase/firebase';

export const ADD_DRINK = 'drink/ADD';
export const REMOVE_DRINK = 'drink/REMOVE';
export const UPDATE_DRINK = 'drink/UPDATE';
export const FETCH_DRINKS = 'drinks/FETCH';

export const addDrink = data => async dispatch => {
  drinks.child(data.name).set(data);
};

export const removeDrink = data => async dispatch => {
  drinks
    .child(data)
    .remove()
    .then(() => {})
    .catch(e => {
      console.log('Error removing: ', data.name, ' error status: ', e);
    });
};

export const updateDrink = data => async dispatch => {
  if (data.oldName === data.newDrink.name) {
    drinks
      .child(data.oldName) // name didn't change, update
      .update(data.newDrink);
  } else {
    drinks
      .child(data.oldName) // name changed, remove old drink
      .remove()
      .then(() => {
        drinks.child(data.newDrink.name).set(data.newDrink); // add new drink
      })
      .catch(e => {
        console.log('Error removing: ', data.name, ' error status: ', e);
      });
  }
};

export const fetchDrinks = () => async dispatch => {
  drinks.on('value', snapshot => {
    dispatch({
      type: FETCH_DRINKS,
      payload: snapshot.val()
    });
  });
};
