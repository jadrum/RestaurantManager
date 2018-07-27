import db from '../../firebase/firebase';
import {
  addToDb,
  secondInstance,
  initSecondFirebase,
  deleteSecondFirebase
} from '../../firebase/firebase';
export const FETCH_EMPLOYEES = 'admin/FETCH';
const RESTAURANTS = 'restaurants';
const USERS = 'users';

//add an employee to the authentication section of database
export const startEmployeeRegisterUser = data => async dispatch => {
  //get firebase secondInstance
  let secondaryApp = initSecondFirebase();

  //create the second instance
  secondInstance(secondaryApp, data.email, data.password).then(
    user => {
      dispatch(
        addNewEmployee({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          user: user.user.uid,
          clearance: data.clearance,
          //not sure how to exactly access this
          rid: data.rid
        })
      );

      deleteSecondFirebase(secondaryApp);
    },
    error => {
      console.log('error code: ', error.code);
      console.log('error message: ', error.message);
      deleteSecondFirebase(secondaryApp);
    }
  );
};

//adds an employee to a restaurant
export const addNewEmployee = data => async dispatch => {
  console.log('Add new employee ', data);
  const { user, rid } = data;
  // let restaurantID = rid
  // addToDb(RESTAURANTS, restaurantID, { name: restaurant }); // add restaurant to db
  let path = '/' + rid + '/users/';
  let rData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    clearance: data.clearance
  };
  addToDb(RESTAURANTS + path, user, rData); // add user to restaurant
  let uData = {
    restaurant: rid,
    clearance: data.clearance
  };
  addToDb(USERS, user, uData); // add user to the user object on root of db
};

export const fetchEmployees = (rid, item) => async dispatch => {
  db.ref('restaurants/' + rid + item).on('value', snapshot => {
    console.log(snapshot.val());

    dispatch({
      type: FETCH_EMPLOYEES,
      payload: snapshot.val()
    });
  });
};
