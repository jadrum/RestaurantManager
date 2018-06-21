import { firebase } from '../../firebase/firebase';
import { LOGIN, LOGOUT } from '../../reducers/auth/auth';
import generateRandomID from 'uuid/v4';
import { addToDb } from '../../firebase/firebase';

/* Gen random id for images */
const genRandomID = (): string => generateRandomID();

const RESTAURANTS = 'restaurants';
const USERS = 'users';

/**
 * TODO: ADD ERROR HANDLING, RETURN AN ERROR
 * after creating a user, you need to create the
 * restaurant and the link to the user
 */
export const startRegisterUser = data => async dispatch => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password);
};

/**
 * used to register restaurants in the db and setup
 * their corresponding admin account
 */
export const addRestaurant = data => async dispatch => {
  const { user, restaurant } = data;
  let restaurantID = genRandomID();
  addToDb(RESTAURANTS, restaurantID, { name: restaurant }); // add name
  let path = restaurantID + '/users/' + user;
  addToDb(RESTAURANTS, path, 'ADMIN'); // add admin
  data = {
    restaurant: restaurantID,
    clearance: 'ADMIN'
  };
  addToDb(USERS, user, data); // add user
};

export const login = uid => ({
  type: LOGIN,
  uid
});

/**
 * TODO: ADD ERROR HANDLING, RETURN AN ERROR
 */
export const startLogin = data => async dispatch => {
  return firebase.auth().signInWithEmailAndPassword(data.email, data.password);
};

export const logout = uid => ({
  type: LOGOUT
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
