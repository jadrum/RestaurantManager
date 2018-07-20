import db from '../../firebase/firebase';

export const FETCH_EMPLOYEES = 'admin/FETCH';

export const fetchEmployees = (rid, item) => async dispatch => {
  db.ref('restaurants/' + rid + item).on('value', snapshot => {
    console.log(snapshot.val());

    dispatch({
      type: FETCH_EMPLOYEES,
      payload: snapshot.val()
    });
  });
};
