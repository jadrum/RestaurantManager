import { firebase, googleAuthProvider } from '../../firebase/firebase';
import { LOGIN, LOGOUT } from '../../reducers/auth/auth';

export const login = uid => ({
  type: LOGIN,
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = uid => ({
  type: LOGOUT
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
