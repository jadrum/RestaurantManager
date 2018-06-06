import * as firebase from 'firebase';
import { FirebaseConfig } from './keys.js';

firebase.initializeApp(FirebaseConfig);

const db = firebase.database();
const drinks = db.ref('drinks');

export { firebase, drinks, db as default };

// child removed
db.ref('drinks').on('child_removed', snapshot => {
  console.log('removed: ', snapshot.key, snapshot.val());
});

// child changed
db.ref('drinks').on('child_changed', snapshot => {
  console.log('updated: ', snapshot.key, snapshot.val());
});

// child added
db.ref('drinks').on('child_added', snapshot => {
  console.log('added: ', snapshot.key, snapshot.val());
});
