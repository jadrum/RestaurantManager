import * as firebase from 'firebase';

const FirebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID
};

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
