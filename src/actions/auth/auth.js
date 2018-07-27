import generateRandomID from 'uuid/v4';
import { firebase, addToDb, getDb } from '../../firebase/firebase';
import { LOGIN, INITDATA, LOGOUT } from '../../reducers/auth/auth';

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
  addToDb(RESTAURANTS, restaurantID, { name: restaurant }); // add restaurant to db
  let path = '/' + restaurantID + '/users/';
  let rData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    clearance: 'ADMIN'
  };
  addToDb(RESTAURANTS + path, user, rData); // add user to restaurant
  let uData = {
    restaurant: restaurantID,
    clearance: 'ADMIN'
  };
  addToDb(USERS, user, uData); // add user to the user object on root of db
};

/**
 * Dispatches an action to upload data about the user
 * to the redux store.
 */
export const initData = (clearance, restaurant, restaurantName) => {
  return {
    type: INITDATA,
    clearance,
    restaurant,
    restaurantName
  };
};

/**
 * redux thunk action for retrieving data about the user
 * who just logged in. It retrieves the information for the
 * user using 'uid'. This includes info such as their
 * clearance, and assigned restaurant. Then this function
 * passes the appropriate info to 'initData' action creator
 * above
 */
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
 * Login action creator.
 */
export const login = (uid, restaurant, clearance, restaurantName) => {
  return {
    type: LOGIN,
    uid
  };
};

/**
 * TODO: ADD ERROR HANDLING, RETURN AN ERROR
 */
export const startLogin = data => async dispatch => {
  return firebase.auth().signInWithEmailAndPassword(data.email, data.password);
};

/**
 * Log out action creator.
 */
export const logout = uid => ({
  type: LOGOUT
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
