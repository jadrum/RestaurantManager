import { firebase } from '../../firebase/firebase';
import { LOGIN, INITDATA, LOGOUT } from '../../reducers/auth/auth';
import generateRandomID from 'uuid/v4';
import { addToDb, getDb } from '../../firebase/firebase';

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

export const login = (uid, restaurant, clearance, restaurantName) => {
  return {
    type: LOGIN,
    uid
  };
};

export const initData = (restaurant, clearance, restaurantName) => {
  return {
    type: INITDATA,
    clearance,
    restaurant,
    restaurantName
  };
};

export const initDataAsync = uid => {
  return dispatch => {
    getDb('users', uid) // getting user info
      .then(
        dataSnapshot => {
          let { clearance, restaurant } = dataSnapshot.val();
          getDb('restaurants', restaurant + '/name') // get restaurant name
            .then(dataSnapshot => {
              dispatch(initData(clearance, restaurant, dataSnapshot.val()));
            });
        },
        error => {
          console.log('user not found in the database');
          console.log('error code: ', error.code);
          console.log('error message: ', error.message);
        }
      );
  };
};

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
