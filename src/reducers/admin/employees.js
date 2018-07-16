export const FETCH_EMPLOYEES = 'admin/FETCH';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };

    default:
      return state;
  }
};
