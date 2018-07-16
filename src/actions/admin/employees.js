import generateRandomID from 'uuid/v4';
import db from '../../firebase/firebase';
import { getDb } from '../../firebase/firebase';

export const FETCH_EMPLOYEES = 'admin/FETCH';

export const fetchEmployees = (rid, item) => async dispatch => {
  db.ref('restaurants/' + rid + item).on('value', snapshot => {
    let employees = Object.keys(snapshot.val()); // get only the UIDs (the keys)
    let path = '/users'; // path to user

    getDb(path, employees[0]).then(
      dataSnapshot => {
        console.log('first user: ', dataSnapshot.val());
      },
      error => {
        console.log('user not found in the database');
        console.log('error code: ', error.code);
        console.log('error message: ', error.message);
      }
    );

    dispatch({
      type: FETCH_EMPLOYEES,
      payload: employees
    });
  });
};
